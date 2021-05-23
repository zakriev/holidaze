import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import Auth from "../context/Auth";
import axios from "axios";
import Footer from "../../components/Footer";
import {Modal, Form, Container, Button, Row, Col } from 'react-bootstrap';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MessagesModal from "../modal/messaagesModal";
 
const schema = yup.object().shape({
    Name: yup.string().required("Name required").min(3, "Enter minimum 3 characters "),
    Type: yup.string(),
    Amenities: yup.string(),
    Featured: yup.boolean(),
    Price: yup.number().required("Price must be set"),
    Description: yup.string().required("Can not submit empty field").min(8, "Type at least 8 characters"),
  });
function Admin({ formData }) {
    const [auth, setAuth] = useContext(Auth);
    const [enquiries, setEnquiries] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [uploadImage, setUploadImage] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory();
    function signout(){
        setAuth(null);
        history.push("/");
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    async function onSend(data) {

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("files.Image", uploadImage, uploadImage.name);
        
        try {
          await axios.post("https://enigmatic-refuge-63589.herokuapp.com/accommodations", 
          formData,
          {  headers: { 'Authorization': `Bearer ${auth.jwt}`}});
        } catch (error) {
          console.log("error", error);
        } finally {
            setModalOpen(false);
          setModalShow(true);
        }
      }
    
    
    useEffect(() => {
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Enquiries')
        .then(response => response.json())
        .then(data => {
            setEnquiries(data);
        });
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Contacts')
        .then(response => response.json())
        .then(data => {
            setMessages(data);
        });
    }, [])

    return (
        <>
         <div className="admin-section">
             <div className="admin-dashboard">
             <h1>Admin</h1>
            <button className="admin-log-out" onClick={() => setModalOpen(true)}> New establishment</button>
             </div>
             <div className="data-wrapper">
             <div className="enquiry-section">
             <h2>New Enquiries</h2>
            <div className="admin-section-item1">
            
             <Modal
                show={modalOpen}
                onHide={() => setModalOpen(false)}
                  size="lg"
                  centered>
                      <h1>Add new establishment</h1>
                      <Form onSubmit={handleSubmit(onSend)} className="contact__form">
                <Col className="col-lg-12">
                  <Form.Group>
                    <Form.Label>Accommodation Name</Form.Label>
                    <Form.Control name="Name" placeholder="Name" {...register("Name")} />
                    {errors?.Name && <span>{errors?.Name.message}</span>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name="Type" {...register("Type")}>
                        <option value="bedandbreakfast">Bed and Breakfast</option>
                        <option value="hotel">Hotel</option>
                        <option value="guesthouse">Guesthouse</option>
                    </Form.Control>
                    {errors?.Type && <span>{errors?.Type.message}</span>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="Price" placeholder="Price" {...register("Price")} />
                    {errors?.Price && <span>{errors?.Price.message}</span>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="Description" className="contact__formControl--text" as="textarea" rows="3" placeholder="Enter description.." {...register("Description")} />
                    {errors?.Description && <span>{errors?.Description.message}</span>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setUploadImage(e.target.files[0])} name="Image" />
                    {errors?.Image && <span>{errors?.Image.message}</span>}
                  </Form.Group>
                  <Form.Group>
                  <Form.Check 
                            type="checkbox"
                            label="Featured"
                            {...register("Featured")}
                        />
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Amenities</Form.Label>
                    <Form.Control name="Amenities" placeholder="Amenities (WPG)" {...register("Amenities")} />
                    {errors?.menities && <span>{errors?.Amenities.message}</span>}
                  </Form.Group>
                  <Button type="submit">Send</Button>
                  <Button type="button" onClick={() => setModalOpen(false)}>Close</Button>
       
                <Modal show={modalShow}
                    onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p className="modal__contact--header">Accommodation Created!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modal__contact--button" onClick={() => setModalShow(false)}>
                        Close
                        </Button>
                    </Modal.Footer>
                    </Modal>
                </Col>
              </Form>
                      
                      </Modal>
                {enquiries.length > 0 && enquiries.map(enq => <div key={enq.id}>
                    <h3>{enq.name}</h3>
                    <p>Email: {enq.email}</p>
                    <p>Booking time: {new Date(enq.published_at).toLocaleString()}</p>
                    <p>Check in: {new Date(enq.checkin).toLocaleDateString()}</p>
                    <p>Check out: {new Date(enq.checkout).toLocaleDateString()}</p>
                </div>)}
            </div>
            </div>
            <div className="admin-message-section">
            <h2>Messages</h2>
            <div className="admin-section-item2">
                {messages.length > 0 && messages.map(msg => <div key={msg.id}>
                    <h3>{msg.name}</h3>
                    <p>Email: {msg.email}</p>
                    <p>Sent Date: {new Date(msg.published_at).toLocaleString()}</p>
                    <p>Message: {msg.message}</p>
                </div>)}
            </div>
            <div className="logout-section">
            <button className="admin-log-out" onClick={signout}> Sign out</button>
            </div>
            </div>
            </div>
        </div>
       
        <Footer />
     </>
    );
}


export default Admin;
