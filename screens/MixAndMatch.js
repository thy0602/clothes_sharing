// import React from "react";
// import { View, Text , ScrollView, Image} from 'react-native';
// import { Camera } from 'expo';
// import { StyleSheet, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker'
// import { Block } from "galio-framework";
// const { width, height } = Dimensions.get("screen");
// import {  Button } from "../components";

// class MixAndMatch extends React.Component {
    
//     constructor(){
//         super()
//         this.state={
//             image: null,
//         };
//     }

//   componentDidMount() {
//     this.didFocus = this.props.navigation.addListener('willFocus', () => {
//       this.setState({
//         name: "",
//         size: "",
//         height: "",
//         weight: "",
//         usedTime: "",
//         priceItem: "",
//         tag: "",
//         // species: "",
//         // breed: "",
//         // weight: "",
//         // height: "",
//         // date: "",
//         image: null,
//         successDialogVisible: false,
//       })
//     })

//   }

//   componentWillUnmount() {
//     this.didFocus.remove();
//   }
//     _pickImage = async () => {
//         try {
//           let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             // allowsEditing: true,
//             // aspect: [4, 3],
//             quality: 1,
//           });
//           if (!result.cancelled) {
//             this.setState({ image: result.uri });
//           }
    
//           console.log(result);
//         } catch (E) {
//           console.log(E);
//         }
//       };
//       render(){
//         let { image } = this.state;
//         return (
//         <ScrollView style={{ flex: 1, width: width, marginTop: 10 }} keyboardShouldPersistTaps="handled">

//             <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
//             <Button style={styles.buttonPick} onPress={this._pickImage}>
//               <Text bold size={12} color={"black"}>
//               Pick clothes image
//               </Text>
//             </Button>
//           </Block>

//           <Block style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             {image && <Image source={{ uri: image }} style={{ width: 500, height: 500 }} />}
//           </Block> 

//           </ScrollView>
//         )
//     }
// };

// const { width: winWidth, height: winHeight } = Dimensions.get('window');
// const styles = StyleSheet.create({
//     preview: {
//         height: winHeight,
//         width: winWidth,
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         right: 0,
//         bottom: 0,
//     },
//   });
// export default MixAndMatch;



import React from "react";
import { View, Text , ScrollView, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo';
import { StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import {  Button } from "../components";
import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from 'expo-file-system';
const axios = require('axios');
import clothes from "../constants/Cloth.js"

class MixAndMatch extends React.Component {
    
    constructor(){
        super()
        this.state={
            image: null,
            recommend_img : null,
        };
    }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        name: "",
        size: "",
        height: "",
        weight: "",
        usedTime: "",
        priceItem: "",
        tag: "",
        // species: "",
        // breed: "",
        // weight: "",
        // height: "",
        // date: "",
        image: null,
        recommend_img: null,
        successDialogVisible: false,
      })
    })

  }

  componentWillUnmount() {
    this.didFocus.remove();
  }
  recommend(dominant_color){
    console.log(dominant_color)
    let dominant_color_arr = dominant_color.split("|")
    let min = Infinity
    let min_index = -1;
    
    for(let i = 0; i < clothes.length; i++)
    {
        let dist = 0;
        cloth_color_arr = clothes[i].main_color.split("|")
        dist += Math.pow(parseInt(cloth_color_arr[0]) - parseInt(dominant_color_arr[0]),2)
        dist += Math.pow(parseInt(cloth_color_arr[1]) - parseInt(dominant_color_arr[1]),2)
        dist += Math.pow(parseInt(cloth_color_arr[2]) - parseInt(dominant_color_arr[2]),2)

        if(dist < min)
        {
            min = dist;
            min_index = i;
        }
    }

    console.log(min)
    console.log(min_index)
    this.setState({
        recommend_img: clothes[min_index].imgSource
    })
  }
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
            const img_base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

            const response = await axios.post('http://0cb523c2d0b4.ngrok.io/upload', {
                image: img_base64
            })

            let dominant_color  = response.data;
            this.recommend(dominant_color);
            
            
              
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
      
      

      render(){
        let { image, recommend_img } = this.state;
        return (
            <ScrollView style={{ flex: 1, width: width, marginTop: 10 }} keyboardShouldPersistTaps="handled">

                <Block middle style={{ elevations: 1, height: height * 0.2, marginTop: -20 }}>
                    <Button style={styles.buttonPick} onPress={
                        this._pickImage
                    }>
                    
                    <Text bold size={12} color={"black"}>Pick clothes image</Text>
                    </Button>
                </Block>

            <Block style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image && <Image source={{ uri: image }} style={{ width: 500, height: 500 }} />}
            </Block> 

            <Block style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {recommend_img && <Image source={{ uri: recommend_img }} style={{ width: 500, height: 500 }} />}
            </Block> 

          </ScrollView>
        )
    }
};

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
  });
export default MixAndMatch;

