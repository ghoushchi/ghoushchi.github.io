# Convolution Interactive Visualization

By [Erik Cheever](http://www.swarthmore.edu/NatSci/echeeve1) & [M. B. Ghaznavi-Ghoushchi](https://github.com/ghoushchi).

This page can be used as part of a tutorial on the convolution of two signals. It lets the user visualize and calculate how the convolution of two functions is determined.

The basic convolution integral is according to:

$$ y(t)=\int_{-\infty}^{+\infty}{h(t-\lambda)\cdot f(\lambda)\cdot d\lambda}=\int_{0^-}^t{h(t-\lambda)\cdot f(\lambda)\cdot d\lambda} $$

 This is is often referred to as graphical convolution. It comes with some features we demonstrated in `Interactive Help and Guide` tab of the tool. Please first look at the help and guide tab.

# Run-Online
Go to the following link and use the online version hosted on `github.io`.
[Online: Convolution Interactive Visualization](https://ghoushchi.github.io/ICS-HPC/EDA/YARPOSE.Convolution.Interactive.Visualization)


# Run-Offline
**Convolution Interactive Visualization** tool suite is a facilitated to be all-included and needs no external library or online CDN. Therefore, it is portable and could be run without need to net access in workflow according the following steps and use the tool offline.

## 1. Download or clone the code
```console
caduser@ubuntu:~$ git clone https://github.com/yarpose/YARPOSE.Convolution.Interactive.Visualization
caduser@ubuntu:~$ cd YARPOSE.Convolution.Interactive.Visualization
caduser@ubuntu:~$ python -m http.server
```


## 2. Start a local just-in-place web server via python 3.x built-in ```http.server``` module

```console
caduser@ubuntu:~$ python -m http.server
```
This command opens a web server on port `:8000` by default. Then open a browser and point to:
```http://localhost:8000/``` in address bar and use the tool normally.

**Note:** If you would like to add your interested functions to this tool, please feel free to write me. We are also working on a new version with user defined and 3rd party simulation outputs be used with this tool.  


![Convolution](media/convolution.gif)

### Credits:
The original version `(c)2005-2022` of this tool was developed by [Erik Cheever](http://www.swarthmore.edu/NatSci/echeeve1). This `(c)2024` is a recap with ease of usage and interactive help. It is developed by [M. B. Ghaznavi-Ghoushchi](https://www.linkedin.com/in/ghaznavi-ghoushchi) with written permission from Prof. Cheever.

# Related Projects
Please follow us to be informed about related projects:

<p>
<a href="https://github.com/yarpose" rel="nofollow noreferrer">
    <img src="media/GH.png" alt="github"> YARPOSE - A Dejavu project in EDA
  </a><br>
  <a href="https://www.linkedin.com/in/ghaznavi-ghoushchi" rel="nofollow noreferrer">
    <img src="media/LI.png" alt="linkedin"> M. B. Ghaznavi-Ghoushchi
  </a> &nbsp; 
  <a href="https://github.com/ghoushchi" rel="nofollow noreferrer">
    <img src="media/GH.png" alt="github"> ghoushchi
  </a>
</p>
