from flask import Flask, request, redirect, render_template
import os
# from feeling import Feeling
import numpy as np
from main1 import *
import math
import shutil
import os
import io
from google.cloud import vision
from google.cloud.vision import types
import cv2

app = Flask(__name__)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'config.json'
client = vision.ImageAnnotatorClient()

@app.route("/")
def submit():
    return "hello"

@app.route("/upload", methods=["POST"])
def upload_file():
    content = request.json['image'].encode('ascii')
    content = base64.b64decode(content)
    
    coordinate_list = detect_cloth_image(client, content)
    crop_cloth_image(coordinate_list, content)
    dominant_color = define_main_color(client)
    print(dominant_color)
    dominant_color_str = str(dominant_color.color.red) + "|" + str(dominant_color.color.green) + "|" + str(dominant_color.color.blue)
    return dominant_color_str

# create list of image name
imageList = []
#for filename in os.listdir(folder):

# find dominant color of all images in DB
folder = './imagedb'
dominant_color = []
def find_dominant_color_all(path):
    for imgPath in imageList:
        don_color = find_dominant_color(imgPath)
        dominant_color.append(don_color)

# predict items to recommend
def submit():
    uploadImg = 'upload/' + FILENAME

    # inference: from image to model then find dominant color of that image
    uploadImg_color = find_dominant_color(imgPath)

    # calculate min euclid distance to find nearest color of predicting image
    min_dist = 1e9
    for i in range(dominant_color):
        color = dominant_color[i]
        squared_euclid_distance = (uploadImg_color.red - color.red)**2 + (uploadImg_color.green - color.green)**2 + (uploadImg_color.blue - color.blue)**2 
        if min_dist > squared_euclid_distance:
            min_dist = squared_euclid_distance
            i_predict = i
            
    global RESULT_PATH
    RESULT_PATH = imageList[i_predict]

    # im.save("display/display.jpg")
    shutil.copyfile(RESULT_PATH, 'predict/result.png')
    os.remove(s)


    

    return redirect(url_for('result'))
if __name__ == '__main__':
    app.run(debug = True)
