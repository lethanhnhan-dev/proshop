import React, { useEffect } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	//   Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	// Dispatch
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;
	if (!loading) {
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	if (!order) {
		return <Loader />;
	} else {
		const orderSuccess = order;
		orderSuccess.itemsPrice = addDecimals(
			orderSuccess.orderItems.reduce(
				(acc, item) => acc + item.price * item.qty,
				0,
			),
		);
		return loading ? (
			<Loader />
		) : error ? (
			<Message variant="danger">{error}</Message>
		) : (
			<>
				<h1>Order ID: {orderSuccess._id}</h1>
				<Row>
					<Col md={8}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Name: </strong>{" "}
									{orderSuccess.user.name}
								</p>
								<p>
									<strong>Email: </strong>
									<a
										href={`mailto:${orderSuccess.user.email}`}
									>
										{orderSuccess.user.email}
									</a>
								</p>
								<p>
									<strong>Address: </strong>
									{orderSuccess.shippingAddress.address},{" "}
									{orderSuccess.shippingAddress.city}{" "}
									{orderSuccess.shippingAddress.postalCode},{" "}
									{orderSuccess.shippingAddress.country}
								</p>
								{orderSuccess.isDelivered ? (
									<Message variant="success">
										Delivered on {orderSuccess.deliveredAt}{" "}
									</Message>
								) : (
									<Message variant="danger">
										Not Delivered
									</Message>
								)}
							</ListGroup.Item>

							<ListGroup.Item>
								<h2>Payment Method</h2>
								<p>
									<strong>Method: </strong>
									{orderSuccess.paymentMethod}
								</p>
								{orderSuccess.isPaid ? (
									<Message variant="success">
										Paid on {orderSuccess.paidAt}{" "}
									</Message>
								) : (
									<Message variant="danger">Not paid</Message>
								)}
							</ListGroup.Item>

							<ListGroup.Item>
								<h2>Order Items</h2>
								{orderSuccess.orderItems.length === 0 ? (
									<Message>Your order is empty</Message>
								) : (
									<ListGroup variant="flush">
										{orderSuccess.orderItems.map(
											(item, index) => (
												<ListGroup.Item key={index}>
													<Row>
														<Col md={1}>
															<Image
																src={item.image}
																alt={item.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link
																to={`/product/${item.product}`}
															>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.qty} x $
															{item.price} = $
															{item.qty *
																item.price}
														</Col>
													</Row>
												</ListGroup.Item>
											),
										)}
									</ListGroup>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Order Summary</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Items</Col>
										<Col>${orderSuccess.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>${orderSuccess.shippingPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col>${orderSuccess.taxPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total</Col>
										<Col>${orderSuccess.totalPrice}</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
};

export default OrderScreen;
