import React, {Component} from 'react';
import {Icon, Button} from 'antd';

export default class Footer extends Component{

    onGithubClick(){
        window.location = 'https://github.com/iloveyoukcl5770';
    }

    render(){
        return (
            <div style={{textAlign: "center", padding:"5% 5% 1% 5%"}}>
                <div style={{fontSize: "1.5em"}}>
                    <Icon type="github" onClick={this.onGithubClick} style={{cursor: "pointer"}}/>
                </div>
                <div>
                    &copy; Chuilian Kong 2017
                </div>
            </div>
        );
    }

}