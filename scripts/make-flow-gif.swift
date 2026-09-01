import AVFoundation
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct FlowGIFError: LocalizedError {
    let message: String
    var errorDescription: String? { message }
}

@main
struct FlowGIFMaker {
    static func main() async throws {
        let arguments = CommandLine.arguments
        guard arguments.count >= 3 else {
            throw FlowGIFError(message: "Usage: make-flow-gif.swift INPUT.mov OUTPUT.gif [width=320] [fps=8]")
        }

        let inputURL = URL(fileURLWithPath: arguments[1])
        let outputURL = URL(fileURLWithPath: arguments[2])
        let targetWidth = arguments.count > 3 ? Int(arguments[3]) ?? 320 : 320
        let framesPerSecond = arguments.count > 4 ? Double(arguments[4]) ?? 8 : 8

        guard targetWidth > 0, framesPerSecond > 0 else {
            throw FlowGIFError(message: "Width and frames per second must be positive")
        }

        let asset = AVURLAsset(url: inputURL)
        let duration = try await asset.load(.duration).seconds
        guard duration.isFinite, duration > 0 else {
            throw FlowGIFError(message: "The input video has no readable duration")
        }

        try FileManager.default.createDirectory(
            at: outputURL.deletingLastPathComponent(),
            withIntermediateDirectories: true
        )

        guard let destination = CGImageDestinationCreateWithURL(
            outputURL as CFURL,
            UTType.gif.identifier as CFString,
            0,
            nil
        ) else {
            throw FlowGIFError(message: "Could not create GIF destination")
        }

        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true
        generator.requestedTimeToleranceBefore = .zero
        generator.requestedTimeToleranceAfter = .zero

        let frameDelay = 1.0 / framesPerSecond
        let frameCount = max(2, Int(ceil(duration * framesPerSecond)))
        let gifProperties: CFDictionary = [
            kCGImagePropertyGIFDictionary: [kCGImagePropertyGIFLoopCount: 0]
        ] as CFDictionary
        let frameProperties: CFDictionary = [
            kCGImagePropertyGIFDictionary: [kCGImagePropertyGIFDelayTime: frameDelay]
        ] as CFDictionary
        CGImageDestinationSetProperties(destination, gifProperties)

        var writtenFrames = 0
        for frameIndex in 0..<frameCount {
            let seconds = min(Double(frameIndex) * frameDelay, max(0, duration - 0.001))
            let time = CMTime(seconds: seconds, preferredTimescale: 600)
            guard let sourceImage = try? generator.copyCGImage(at: time, actualTime: nil),
                  let image = resize(sourceImage, width: targetWidth)
            else {
                continue
            }
            CGImageDestinationAddImage(destination, image, frameProperties)
            writtenFrames += 1
        }

        guard writtenFrames > 0, CGImageDestinationFinalize(destination) else {
            throw FlowGIFError(message: "No GIF frames were written")
        }

        print("Wrote \(writtenFrames) frames (\(targetWidth) px, \(framesPerSecond) fps) to \(outputURL.path)")
    }

    private static func resize(_ image: CGImage, width: Int) -> CGImage? {
        let height = max(1, Int((Double(image.height) * Double(width) / Double(image.width)).rounded()))
        guard let context = CGContext(
            data: nil,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else {
            return nil
        }

        context.interpolationQuality = .high
        context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
        return context.makeImage()
    }
}
