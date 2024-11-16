import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';
import { useTheme } from '@react-navigation/native';

interface ToDoItemProps {
    todo: {
        id: string;
        content: string;
        isCompleted: boolean;
    },
    onSubmit: () => void
}
const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [content, setContent] = useState('');
    const input = useRef(null);
    // const { colors } = useTheme();
    useEffect(() => {
        if (!todo) { return }
        setIsChecked(todo.isCompleted);
        setContent(todo.content);
    }, [todo])

    useEffect(() => {
        if (input.current) {
            input?.current?.focus();
        }
    }, [input])

    const onKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace' && content === '') {
            console.warn('Delete item')
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
            <Checkbox 
                isChecked={isChecked} 
                onPress={() => { setIsChecked(!isChecked) }}/>
            <TextInput
                ref={input}
                value={content}
                onChangeText={setContent}
                style={{
                    flex: 1,
                    fontSize: 18,
                    // color: colors.text,
                    marginLeft: 12,
                }}
                multiline
                onSubmitEditing={onSubmit}
                blurOnSubmit
                onKeyPress={onKeyPress}
            />
        </View>
    )
}

export default ToDoItem