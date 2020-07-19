import React from "react";
import { View, Text , ScrollView, Image} from 'react-native';
import { Camera } from 'expo';
import { StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import {  Button } from "../components";

class MixAndMatch extends React.Component {
    
    constructor(){
        super()
        this.state={
            image: null,
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
        successDialogVisible: false,
      })
    })

  }

  componentWillUnmount() {
    this.didFocus.remove();
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
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
      render(){
        let { image } = this.state;
        return (
        <ScrollView style={{ flex: 1, width: width, marginTop: 10 }} keyboardShouldPersistTaps="handled">

            <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
            <Button style={styles.buttonPick} onPress={this._pickImage}>
              <Text bold size={12} color={"black"}>
              Pick clothes image
              </Text>
            </Button>
          </Block>

          <Block style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 500, height: 500 }} />}
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

