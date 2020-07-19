import os
import io
from google.cloud import vision
from google.cloud.vision import types
import cv2

def detect_cloth_image(path):
  with open(path, 'rb') as image_file:
    content = image_file.read()
    print("AAA", type(content))
    image = vision.types.Image(content=content)

    objects = client.object_localization(
        image=image).localized_object_annotations

    print('Number of objects found: {}'.format(len(objects)))
    
    object_name_list = ["Dress", "Top"]
    coordinate_list = []
    for object_ in objects:
        print('\n{} (confidence: {})'.format(object_.name, object_.score))
        print('Normalized bounding polygon vertices: ')
        
        if object_.name in object_name_list:
          coordinate_list.append(object_.bounding_poly.normalized_vertices)
        
        for vertex in object_.bounding_poly.normalized_vertices:
            print(' - ({}, {})'.format(vertex.x, vertex.y))

  return coordinate_list

def define_main_color():
  with io.open("./result.png", 'rb') as image_file:
    content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.image_properties(image=image)
    props = response.image_properties_annotation
    print('Properties:')

    # for color in props.dominant_colors.colors:
    #     print('fraction: {}'.format(color.pixel_fraction))
    #     print('\tr: {}'.format(color.color.red))
    #     print('\tg: {}'.format(color.color.green))
    #     print('\tb: {}'.format(color.color.blue))
    #     print('\ta: {}'.format(color.color.alpha))

    dominant_color = props.dominant_colors.colors[0]
  
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    return dominant_color

def crop_cloth_image(coordinate_list, path):
  img = cv2.imread(path)
  y = img.shape[0]
  x = img.shape[1]
  
  for coord in coordinate_list:
    w = int((coord[1].x - coord[0].x)*x)
    h = int((coord[3].y - coord[0].y)*y)
    x0 = int(coord[0].x * x)
    y0 = int(coord[0].y * y)

    print(f'{x} {y} {w} {h}')

    crop_image = img[y0:y0+h, x0:x0+w]
    print(crop_image)
    cv2.imwrite("result.png", crop_image)



if __name__ == "__main__":  
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'config.json'
  client = vision.ImageAnnotatorClient()

  path = "./test1.jpg"
  coordinate_list = detect_cloth_image(path)
  crop_cloth_image(coordinate_list, path)
  dominant_color = define_main_color()
  print("dominant_color", dominant_color)
  


