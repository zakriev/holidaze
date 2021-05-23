import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { enquiry_url } from "./settings/contactApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import MessagesModal from "./modal/messaagesModal";



const schema = yup.object().shape({
  name: yup.string().required("Full name required").min(5, "Enter minimum 5 characters "),
  email: yup.string().required("Your email required").email("Enter email address"),
  checkin: yup.date().required("Need a check-in date"),
  checkout: yup.date().required("Need a check-out date"), 
});

export default function EnquiryForm({ formData }) {
  const [modalShow, setModalShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSend(data) {
    data.contact = formData;

    try {
      await axios.post(enquiry_url, data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setModalShow(true);
    }
  }

  return (
    <div id="contact" className="contact-form-wrapper">
      <div className="enquiry-heading">
      <h1>BOOK NOW</h1>
      <p>Fill out the form and send, its that simple</p>
      </div>
    <div className="contact-form-items">
    <div className="contactForm">
    <Container fluid>
        <Row className="justify-content-md-center">
        <Col className="col-lg-10">
            <div className="contact__col"> {modalShow && <MessagesModal show={modalShow} />} 
            <Form onSubmit={handleSubmit(onSend)} className="contact__form">
                <Col className="col-lg-12">
                    <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="name" placeholder="Name" {...register("name")} />
                    {errors?.name && <span>{errors?.name.message}</span>}
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" placeholder="Email" {...register("email")} />
                    {errors?.email && <span>{errors?.email.message}</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Check In</Form.Label>
                    <Form.Control type="date" placeholder="Enter your check-in date.." {...register("checkin")} />
                    {errors?.checkin && <span>{errors?.checkin.message}</span>}
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Check Out</Form.Label>
                    <Form.Control type="date" placeholder="Enter your check-out date.." {...register("checkout")} />
                    {errors?.checkout && <span>{errors?.checkout.message}</span>}
                    </Form.Group>
                <Button type="submit">Send</Button>
                <MessagesModal
                    show={modalShow}
                    onHide={() => {
                    setModalShow(false);
                    window.location.reload();
                    }}
                />
                </Col>
            </Form>
            
            </div>
        </Col>
        </Row>
    </Container>
    </div>
    </div>
    </div>
    );
}








