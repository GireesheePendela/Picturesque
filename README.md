# Steganographyio

Summer Project

A simple website to hide files within images, built using Web Workers and Subtle Crypto in vanilla JavaScript.

1. [Preliminary Research](#1-preliminary-research)

   1.1. [What Is Steganography?](#11-what-is-steganography)

   1.2. [Types of Steganography](#12-types-of-steganography)

   1.3. [End of File Markers](#13-end-of-file-markers)

2. [Implementation](#2-implementation)

   2.1. [Hiding the Files](#21-hiding-the-files)

   2.2. [Revealing the Files](#22-revealing-the-files)

## 1. Preliminary Research

#### 1.1. What Is Steganography?

Here's a short summary paraphrased from [Wikipedia](https://en.wikipedia.org/wiki/Steganography):
Here's a short summary of what steganography is all about:

_Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny. Plainly visible encrypted messages, no matter how unbreakable they are, arouse interest and may in themselves be incriminating. The first recorded use of steganography can be traced back to 440 BC, but it continues to be an incredibly versatile and effective method for obscuring or hiding information in plain sight._

@@ -38,20 +52,38 @@ The files are hidden inside the image through a series of steps:

1. Firstly the image is read. In StegaPhoto, all files are read as an array buffer using the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). The image is then converted into a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (an array of 8-bit unsigned integers).

2. The files are then archived using [JSZip](https://stuk.github.io/jszip/), with the option of compression. The ZIP is generated as a Uint8Array.
3. The files are then archived using [JSZip](https://stuk.github.io/jszip/), with the option of compression. The resulting ZIP file is to be hidden inside the image.

4. Next comes the encryption of the files, in 3 steps:
5. Next comes the encryption of the ZIP (and hence the files inside the ZIP). The encryption uses the [SubtleCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) and involves 3 steps:

   1. The plaintext password is imported to create a _derivation key_.

   2. The _derivation key_ is hashed using **SHA-256** and a salt; the salt is a Uint8Array taken from the start of the image (this prevents a dictionary attack of passwords). A new key is then derived using the **PBKDF2** algorithm.

   3. Finally, the files can be encrypted using this new _encryption key_. StegaPhoto uses the symmetric **AES-CTR** algorithm to encrypt the data.

6. The Uint8Array of the image and the encrypted ZIP are then concatenated, to place the files after the EOF marker.
7. After encrypting the ZIP of files, the resulted is converted to another Uint8Array. The image and the encrypted ZIP are then concatenated, to place the files after the [EOF marker](#13-end-of-file-markers).

   ```
      Original image file
   ╭────────────┸────────────╮
   | Contents of image | EOF | Encrypted ZIP |
   ```

8. The files are now hidden inside the image. Finally the image is converted to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and a [URL is created](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) to download the resulting image.

#### 2.2. Revealing the Files

Revealing the files is a similar process to hiding, albeit in reverse:

1. The file is read using the FileReader API and converted to a Uint8Array.

2. The [EOF marker](#13-end-of-file-markers) is found by iterating through the array. The files to be retrieved immediately follow the EOF marker.

   - If no content follows the EOF marker, then the image does not contain any hidden files.

3. The decryption of the hidden ZIP uses the same technique as is used for encryption: however, the _derivation key_ is used to derive a _decryption key_ which is then used with the **AES-CTR** algorithm to decrypt the data.

4. After the ZIP has been decrypted, the files can then be extracted using the JSZip library - these should be exactly the same as the original files, bit-for-bit.

5. Although the files have been extracted from the ZIP, for ease it is the ZIP which is offered to the end user to download.
