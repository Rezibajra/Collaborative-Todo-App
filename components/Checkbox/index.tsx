import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text } from 'react-native';

interface CheckBoxProps {
    isChecked: boolean;
    onPress: () => void;
}

const Checkbox = (props: CheckBoxProps) => {
    const { onPress, isChecked } = props;
    const name = isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
    return (
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons name={name} size={24} color="#e33062" />
        </Pressable>
    )
}

export default Checkbox