import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { contact_url } from "././settings/contactApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import MessagesModal from "./modal/messaagesModal";



const schema = yup.object().shape({
  name: yup.string().required("Full name required").min(5, "Enter minimum 5 characters "),
  email: yup.string().required("Your email required").email("Enter email address"),
  message: yup.string().required("Can not submit empty field").min(8, "Type at least 8 chaaracters"),
});

export default function ContactForm({ formData }) {
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
      await axios.post(contact_url, data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setModalShow(true);
    }
  }

  return (
    <div id="contact" className="contact-form-wrapper">
      <h1>Contact</h1>
      <div className="contact-form-items">
      <div className="umbrella-section">
        <img src="./images/Logo.png" alt="umbrella" />
      </div>
      <div className="contactForm">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="col-lg-10">
            <h1>Contact Us</h1>
            <div className="contact__col">
              {modalShow && <MessagesModal show={modalShow} />}
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
                    <Form.Label>Message</Form.Label>
                    <Form.Control name="message" className="contact__formControl--text" as="textarea" rows="3" placeholder="Enter your message.." {...register("message")} />
                    {errors?.message && <span>{errors?.message.message}</span>}
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







