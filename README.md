# Housecat
Housecat is a live server for web development. 
Built using *Node.js*.

## Why?
**Housecat** is developed with the aim of it being a server for web development.
It reloads the webpage each time any change occurs in the directory.  
It provides a command line tool named `housecat`.

## Installation
**Using npm**(recommended):
- Run this command in the terminal
```sh
npm install -g housecat
```
**From GitHub**:
- Run this command
```sh
git clone https://github.com/LeknoSoftware/housecat.git
```
- Navigate to the project directory
```sh
cd housecat
```
- Install `housecat` globally
```sh
npm install -g
```
## Usage
Housecat provides a command line tool named `housecat`.    

All `html` pages of the current directory get live reloaded using housecat(from v1.1.0).

Navigate to your project directory.  
To run a file, say `path/to/index.html`, just run the command:
```sh
housecat path/to/index.html
```
**Note**: Only files in the current directory can be run using housecat. 

By default port *3000* is used.   
To use any other port, say *5000* for the file `path/to/index.html`, just run:
```sh
housecat path/to/index.html 5000
```
For help, run:
```sh
housecat --help
```
#### Accessing the webpage
Open the specified port in your browser.  
For example, if the port is *3000*, then type in your browser:
```
localhost:3000
```
That's it! All your changes will get reflected without manual reloading.

## LICENSE
This project is MIT licensed. See the [LICENSE](LICENSE) file.





