import React from 'react';

class ThreadDisplay extends React.Component{

}

const TextFieldSubmit = (props) => {
    let input;
    return(
        <div className='ui input'>
            <input 
                ref = {node => input = node}
            >
            </input>
            <button
                onClick={() => {
                    props.onSubmit(input.value);
                    input.value = '';
                }}
                className = 'ui primary button'
                type = 'submit'
            >
                Submit
            </button>
        </div>
    )
}

const MessageList = (props) => {
    <div className='ui comments'>
        {
            props.message.map((m,index) => (
                <div
                  className='comment'
                  key={index}
                  onClick={() => props.onClick(m.id)}
                >
                    <div className='text'>
                        {m.text}
                        <span className='metadata'>@{m.timestamp}</span>
                    </div>
                </div>
            ))
        }
    </div>
}


const Thread = (props) => {
    <div className='ui center aligned basic segment'>
        <MessageList
            messages={props.thread.messages}
            onClick={props.onMessageClick}
        />
        <TextFieldSubmit
            onSubmit={props.onMessageSubmit}
        />
    </div>
}

class ThreadDisplay extends React.Component{
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    render(){
        const state = store.getState();
        const activeThreadId = state.activeThreadId;
        const activeThread = state.threads.find(t => t.id === activeThreadId);

        return(
            <Thread
                thread = {activeThread}
                onMessageClick = {(id) => (
                    store.dispatch({
                        type:'DELETE_MESSAGE',
                        id: id,
                    })
                )}
                onMessageSubmit = {(text) => (
                    store.dispatch({
                        type: 'ADD_MESSAGE',
                        text: text,
                        threadId: activeThreadId,
                    })
                )}
                />
        )
    }
}