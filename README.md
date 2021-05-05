# CCipher

Encodes/decodes input text with [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher). Only english alphabet is affected, other symbols are ignored.

__Required arguments:__  
```-s, --shift```&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;non-zero number describing _shift_ amount  
```-a, --action```&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defines cipher direction, accepts ```encode``` | ```decode```

__Optional arguments:__  
```-i, --input```&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path to input text file; if omitted, __stdin__ is used as input  
```-o, --output```&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path to output text file; if omitted, __stdout__ is used as output

__Examples:__  
```node index -s 1 -a encode``` will cipher _"abc"_ to _"bcd"_  
```node index -s 1 -a decode``` will decipher _"abc"_ to _"zab"_  
```node index -s -7 -a encode``` will cipher _"ABC abc _ 123"_ to _"TUV tuv _ 123"_