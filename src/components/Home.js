import React from 'react';
import {GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY, API_ROOT} from "../constants"
import { Tabs, Spin } from 'antd';
import $ from 'jquery';
import {Gallery} from './Gallery';
import {CreatePostButton} from "./CreatePostButton"

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: [],

    }
    componentDidMount() {
        this.getGeoLocation();
    }
    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            /*geolocation is not available*/
            this.setState({ error: 'Your browser does not support geolocation!' });
        }
    }
    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        this.setState({loadingGeoLocation: false, error : ''});
        localStorage.setItem(POS_KEY, JSON.stringify({
                lat: latitude,
                lon: longitude,
            }
        ));
        this.loadNearByPosts();
    }
    onFailedLoadGeoLocation  = () => {
        this.setState({
            loadingGeoLocation: false,
            error: 'Failed to load geoLocation'
        });
    }

    loadNearByPosts = () => {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        this.setState({
            loadingPosts: true,
            error: '',
        });
        $.ajax({
            url:`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then((response)=> {
            this.setState({
                posts: response,
                loadingPosts: false,
                error: '',
            });
            console.log(response);
        },(error)=> {
            this.setState({
                loadingPosts: false,
                error: error.responseText,
            });
            console.log(error);
        }).catch((error)=> {
            console.log(error);
        });
    }

    getGalleryPanelContent = () => {
        //console.log("click")
        if (this.state.error) {
            return <div>
                {this.state.error}
            </div>;
        } else if (this.state.loadingGeoLocation) {
            console.log("loading geo location ...");
            return <Spin tip = "loading geo location ..."/>
        } else if (this.state.loadingPosts) {
            console.log("loading posts ...");
            return <Spin tip = "loading posts ..."/>
        } else if (this.state.posts && this.state.posts.length > 0) {
            const  images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                }
            });
            return <Gallery images = {images}/>
        }
        else {
            return null;
        }
    }

    render() {
        const operations = <CreatePostButton loadNearbyPosts = {this.loadNearByPosts}/>
        return(
                <Tabs tabBarExtraContent={operations}  className="main-tabs">
                    <TabPane tab="Posts" key="1" type ="primary">{this.getGalleryPanelContent()}</TabPane>
                    <TabPane tab="Map" key="2" type ="primary">Content of tab 2</TabPane>
                </Tabs>
        );
    }
}