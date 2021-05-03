import React, { Fragment, useEffect, useState } from 'react'
import "./Home.css"
import axiosInstance from '../axios';
import { Col, Row, Container, Button, CardDeck, Breadcrumb } from 'react-bootstrap'


import Cards from './Restaurantcard';
import { useHistory } from 'react-router';





const Restaurant = () => {
    var history = useHistory();
    const id = history.location.state.id
    useEffect(() => {
        getRestaurant(id)
    }, []);

    const [restaurants, setRestaurant] = useState([])
    const [loading, setLoading] = useState(false)

    const getRestaurant = async () => {
        try {
            const res = await axiosInstance.get('/cities/' + id + '/')
            setRestaurant(res.data)
            setLoading(true)
        } catch (err) {
            alert(err.message);

        }
    }

    const VegOnly = async () => {
        try {
            const res = await axiosInstance.get('/cities/' + id + '/restaurant/veg_only/')
            setRestaurant(res.data)
            setLoading(true)
        } catch (err) {
            alert(err.message);

        }
    }

    return (
        <Fragment>

          
            <Container>

            <Button onClick={getRestaurant} className="mr-1">All</Button>
            <Button onClick={VegOnly}>VegOnly</Button>
                <Row>
                    {loading &&
                        restaurants.map((restaurant) => (

                            <CardDeck>


                                <Cards restaurant={restaurant} key={restaurant.id} re={getRestaurant} />


                            </CardDeck>


                        ))
                    }
                </Row>
            </Container>


        </Fragment>

    )


}

export default Restaurant;