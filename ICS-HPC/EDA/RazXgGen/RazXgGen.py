#!/usr/bin/python

# RazXgGen.py - A python package for generating Razavi's Analog Exa-gons (Analog Octagon)++
# Copyright (C)2022 M. B. Ghaznavi-Ghoushchi
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program.  If not, see <http://www.gnu.org/licenses/>.
#
#  Simple How-to:
#  Edit the JSON file with care and add your own data
#  then simply run the python script and look for outputs in html folder
#
'''
Use from the following sample pointStyle values in your own configs.
    'circle'
    'cross'
    'crossRot'
    'dash'
    'line'
    'rect'
    'rectRounded'
    'rectRot'
    'star'
    'triangle'
'''

# Do not edit this section
import os
import json
from jinja2 import Environment, PackageLoader
env = Environment(loader=PackageLoader('app'))
template = env.get_template('index.html')
root = os.path.dirname(os.path.abspath(__file__))
# End of do not edit this section


#Sample 1  
# Edit json if you want
filename = os.path.join(root, 'html', 'index.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))

#Sample 2  
# Edit json if you want
filename = os.path.join(root, 'html', 'index1.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65,]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))


#Sample 3  
# Edit json if you want
filename = os.path.join(root, 'html', 'index2.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power", "Design Time"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70, 49]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70, 60]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65, 90]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))

#Sample 4  
# Edit json if you want
filename = os.path.join(root, 'html', 'index3.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power", "Design Time"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70, 49]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70, 60]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65, 90]'},
{"DesignName": "Design 4", "borderColor": "cyan", "pointStyle": "star", "data": '[64, 36, 55, 20, 70, 65, 34, 45, 70]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))

#Sample 5  
# Edit json if you want
filename = os.path.join(root, 'html', 'index4.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power", "Design Time", "Extra Param one"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70, 49, 33]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70, 60, 91]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65, 90, 66]'},
{"DesignName": "Design 4", "borderColor": "cyan", "pointStyle": "star", "data": '[64, 36, 55, 20, 70, 65, 34, 45, 70, 77]'},
{"DesignName": "Design 5", "borderColor": "magenta", "pointStyle": "rectRounded", "data": '[75, 65, 20, 44, 40, 85, 44, 35, 60, 87]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))

#Sample 6  
# Edit json if you want
fileout = 'index5.html'
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65,]'},
]
filename = os.path.join(root, 'html', fileout)
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))

#Sample 7  
# Edit json if you want
filename = os.path.join(root, 'html', 'index6.html')
mydata = [
{"Parameters":       '["Noise", "Linearity", "Gain", "Supply Voltage", "Voltage Swing", "Speed", "I/O Impedance", "Power", "Design Time", "Extra Param one", "Extra Param two"]'},
{"DesignName": "Design 1", "borderColor": "red", "pointStyle": "triangle", "data": '[65, 75, 70, 80, 60, 80, 60, 70, 49, 33, 89]'},
{"DesignName": "Design 2", "borderColor": "blue", "pointStyle": "rect", "data": '[54, 65, 60, 70, 70, 75, 75, 70, 60, 91, 19]'},
{"DesignName": "Design 3", "borderColor": "green", "pointStyle": "circle", "data": '[84, 56, 75, 40, 90, 85, 54, 65, 90, 66, 45]'},
{"DesignName": "Design 4", "borderColor": "cyan", "pointStyle": "star", "data": '[64, 36, 55, 20, 70, 65, 34, 45, 70, 77, 63]'},
{"DesignName": "Design 5", "borderColor": "magenta", "pointStyle": "rectRounded", "data": '[75, 65, 20, 44, 40, 85, 44, 35, 60, 87, 20]'},
{"DesignName": "Design 6", "borderColor": "orange", "pointStyle": "dash", "data": '[44, 34, 90, 77, 50, 35, 74, 25, 80, 47, 60]'},
]
with open(filename, 'w') as fh:
    print("Generating output...")
    fh.write(template.render(mydata=mydata, ))
