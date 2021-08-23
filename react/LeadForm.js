import React, { Component } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid/non-secure'
import { Card, Input, Button } from 'vtex.styleguide'

class LeadForm extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         id: nanoid(),
         name: '',
         email: '',
         phone: ''
      }
    }
    
    changeHandler = (e)  =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        // e.preventDefault()
        axios.defaults.headers.put['Content-Type'] ='application/json';
        axios.put('https://z584vx4z2e.execute-api.us-east-2.amazonaws.com/leads', this.state)
        .then(response => {
            console.log(response)
        })
    }

    render() {
        const {id, name, email, phone} = this.state
        return (
            <div className="">
                <Card>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input 
                        type='hidden' 
                        name ='id' 
                        onChange={this.changeHandler}
                        value={id}></input>
                    </div>
                    <div className="mb5">
                        <Input 
                        type='text'
                        placeholder='Nome'
                        name ='name' 
                        size='large'
                        autoFocus
                        required
                        onChange={this.changeHandler}
                        value={name}/>
                    </div>
                    <div className="mb5">
                        <Input 
                        type='email' 
                        placeholder='Email'
                        name ='email' 
                        required
                        onChange={this.changeHandler}
                        value={email}/>
                    </div>
                    <div className="mb5">
                        <Input 
                        type='number' 
                        placeholder='Telefone'
                        name ='phone' 
                        required
                        onChange={this.changeHandler}
                        value={phone}/>
                    </div>
                    <div className="mb5">
                        <Button variation="primary" onClick="{this.submitHandler}">Quero desconto!</Button>
                    </div>
                </form>
                </Card>
            </div>
        )
    }
}

export default LeadForm
