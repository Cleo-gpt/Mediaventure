// Détoure une photo de personne (fond transparent) avec la détection de personnes de macOS (framework Vision),
// sans internet. Sert aux portraits des profs affichés à côté des dialogues.
// usage : swift outils/detourer.swift références/personnages/droz_photo.png portraits/droz.png
import AppKit
import CoreImage
import Vision

let args = CommandLine.arguments
guard args.count == 3 else {
  print("usage : swift outils/detourer.swift photo.png sortie.png")
  exit(1)
}
guard let source = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else {
  print("photo illisible : \(args[1])")
  exit(1)
}

// Masque de la personne, en qualité maximale
let requete = VNGeneratePersonSegmentationRequest()
requete.qualityLevel = .accurate
requete.outputPixelFormat = kCVPixelFormatType_OneComponent8
try VNImageRequestHandler(ciImage: source).perform([requete])
guard let masqueBrut = requete.results?.first?.pixelBuffer else {
  print("aucune personne trouvée dans \(args[1])")
  exit(1)
}

// Le masque sort en basse résolution : on l'agrandit à la taille de la photo, on adoucit un peu le bord
var masque = CIImage(cvPixelBuffer: masqueBrut)
masque = masque.transformed(by: CGAffineTransform(scaleX: source.extent.width / masque.extent.width,
                                                  y: source.extent.height / masque.extent.height))
masque = masque.applyingGaussianBlur(sigma: 1.2).cropped(to: source.extent)

let fond = CIImage(color: .clear).cropped(to: source.extent)
let detoure = source.applyingFilter("CIBlendWithMask", parameters: [
  kCIInputBackgroundImageKey: fond,
  kCIInputMaskImageKey: masque,
])

let contexte = CIContext()
guard let image = contexte.createCGImage(detoure, from: source.extent) else { exit(1) }
let png = NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:])!
try png.write(to: URL(fileURLWithPath: args[2]))
print("✓ \(args[2])")
