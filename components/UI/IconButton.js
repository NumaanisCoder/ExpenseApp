import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { GlobalStyles } from "../../constants/style";

function IconButton({icon,size,color, onPress}){
    return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        margin:10
    },
    pressed: {
        backgroundColor:GlobalStyles.colors.primary700,
        opacity: 0.70,
        borderRadius:30
    }
})