import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';
import { useTheme } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';

const UPDATE_TODO = gql`
mutation updateTodo($id:ID!, $content:String, $isCompleted:Boolean) {
  updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
    id
    content
    isCompleted
    taskList {
      title
      progress
      todos {
        id
        content
        isCompleted
      }
    }
  }
}
`;

const DELETE_TODO = gql`
mutation deleteTodo($id:ID!){
  deleteToDo(id:$id)
}
`;
interface ToDoItemProps {
    todo: {
        id: string;
        content: string;
        isCompleted: boolean;
    },
    onSubmit: () => void
    onDelete: (id: string) => void;
}
const ToDoItem = ({ todo, onSubmit, onDelete }: ToDoItemProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [content, setContent] = useState('');

    const [updateItem] = useMutation(UPDATE_TODO);
    const [deleteItem] = useMutation(DELETE_TODO);
    const input = useRef(null);

    const callUpdateItem = () => {
        updateItem({
            variables: {
                id: todo.id,
                content,
                isCompleted: isChecked,
            }
        })
    };

    const callUpdateItemCheckbox = (newCheckedState: Boolean) => {
        updateItem({
            variables: {
                id: todo.id,
                content,
                isCompleted: newCheckedState, // Use the updated state
            }
        });
    };

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
            console.warn('Delete item', todo)
            deleteItem({
                variables: {
                    id: todo.id,
                }
            })
            onDelete(todo.id);
            // callUpdateItem();
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
            {/* <Checkbox 
                isChecked={isChecked} 
                onPress={() => { 
                    setIsChecked(!isChecked);
                    callUpdateItem();
                }}/> */}
            <Checkbox 
                isChecked={isChecked} 
                onPress={() => { 
                    setIsChecked(prevState => {
                        const newState = !prevState; // This is the updated value of isChecked
                        callUpdateItemCheckbox(newState); // Pass the updated value to callUpdateItem
                        return newState; // Update the state
                    });
                }} 
            />
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
                onEndEditing={callUpdateItem}
                onSubmitEditing={onSubmit}
                blurOnSubmit
                onKeyPress={onKeyPress}
            />
        </View>
    )
}

export default ToDoItem