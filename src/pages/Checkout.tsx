import {Button, Col, Container, Form, Modal, Row, Stack} from "react-bootstrap";
import {CartItem} from "../components/CartItem";
import {useState} from "react";
import {useShoppingCart} from "../hooks/useShoppingCart";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {formatCurreny} from "../utils/currencyUtils";

export function Checkout() {
  const {cartItems, removeFromCart} = useShoppingCart();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  type FormInput = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    address2: string;
    city: string;
    country: string;
    zip: number;
    cartName: string;
    cartNumber: number;
    cartExp: string;
    cartCvv: number;
    terms: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();

  function onSubmit() {
    cartItems.forEach(item => {
      removeFromCart(item.id);
    });
    setShowModal(true);
  }

  return (
    <Container>
      <div className="py-5 text-center">
        <h2>Checkout</h2>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Cart</span>

            <span className="badge bg-primary rounded-pill">
              <>{cartItems.length}</>
            </span>
          </h4>
          <h3>
            <span className="d-flex justify-content-center align-items-center badge bg-secondary rounded-pill ">
              Total:{" "}
              {formatCurreny(
                cartItems.reduce((total, cartItem) => {
                  return (
                    total +
                    (cartItem.saleInfo.listPrice?.amount ?? 0) *
                      cartItem.quantity
                  );
                }, 0)
              )}
            </span>
          </h3>

          <Stack gap={3}>
            {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </div>

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <Form
            noValidate
            className="needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register("firstName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  type="text"
                  placeholder="First Name"
                  required
                />
                {errors.firstName?.type === "maxLength" && (
                  <p className="text-danger">
                    First name cannot exceed 20 characters
                  </p>
                )}
                {errors.firstName?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                {errors.firstName?.type === "pattern" && (
                  <p className="text-danger">Alphabetical characters only</p>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...register("lastName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  type="text"
                  placeholder="Last Name"
                />
                {errors.lastName?.type === "maxLength" && (
                  <p className="text-danger">
                    First name cannot exceed 20 characters
                  </p>
                )}
                {errors.lastName?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                {errors.lastName?.type === "pattern" && (
                  <p className="text-danger">Alphabetical characters only</p>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-danger">Invalid format.</p>
                )}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                required
                type="text"
                {...register("address", {
                  required: true,
                })}
              />
              {errors.address?.type === "required" && (
                <p className="text-danger">This field is required.</p>
              )}
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  {...register("city", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  type="text"
                  placeholder="City"
                />
                {errors.city?.type === "maxLength" && (
                  <p className="text-danger">
                    First name cannot exceed 20 characters
                  </p>
                )}
                {errors.city?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                {errors.city?.type === "pattern" && (
                  <p className="text-danger">Alphabetical characters only</p>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  {...register("country", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  type="text"
                  placeholder="Country"
                />
                {errors.country?.type === "maxLength" && (
                  <p className="text-danger">
                    First name cannot exceed 20 characters
                  </p>
                )}
                {errors.country?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                {errors.country?.type === "pattern" && (
                  <p className="text-danger">Alphabetical characters only</p>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  {...register("zip", {
                    maxLength: 10,
                    pattern: /^[0-9]*$/i,
                  })}
                  type="number"
                  placeholder="Zip"
                />
                {errors.zip?.type === "maxLength" && (
                  <p className="text-danger">
                    First name cannot exceed 10 characters.
                  </p>
                )}
                {errors.zip?.type === "pattern" && (
                  <p className="text-danger">Numerical characters only</p>
                )}
              </Form.Group>
            </Row>

            <hr />
            <h4 className="mb-3">Payment</h4>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Holder's Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Holder's Full Name"
                  required
                  {...register("cartName", {
                    required: true,
                    maxLength: 40,
                    pattern: /^[a-zA-Z][a-zA-Z ]+$/i,
                  })}
                />
                {errors.cartName?.type === "maxLength" && (
                  <p className="text-danger">Cannot exceed 40 characters.</p>
                )}
                {errors.cartName?.type === "pattern" && (
                  <p className="text-danger">Alphabetical characters only.</p>
                )}
                {errors.cartName?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Card Number"
                  maxLength={12}
                  required
                  {...register("cartNumber", {
                    required: true,
                    maxLength: 12,
                    minLength: 12,
                    pattern: /^[0-9]*$/i,
                  })}
                />
                {errors.cartNumber?.type === "maxLength" ||
                  (errors.cartNumber?.type === "minLength" && (
                    <p className="text-danger">
                      Card Number should be 12 digits.
                    </p>
                  ))}
                {errors.cartNumber?.type === "pattern" && (
                  <p className="text-danger">Numerical characters only.</p>
                )}
                {errors.cartNumber?.type === "required" && (
                  <p className="text-danger">This field is required.</p>
                )}
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col as={Row}>
                <Form.Group as={Col}>
                  <Form.Label>Expiration</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    required
                    {...register("cartExp", {
                      required: true,
                      maxLength: 5,
                      minLength: 5,
                      pattern: /^\d{2}\/\d{2}$/i,
                    })}
                  />
                  {errors.cartExp?.type === "maxLength" ||
                    (errors.cartExp?.type === "minLength" && (
                      <p className="text-danger">
                        Expiration date should be mm/YY
                      </p>
                    ))}
                  {errors.cartExp?.type === "pattern" && (
                    <p className="text-danger">
                      Expiration date should be mm/YY
                    </p>
                  )}
                  {errors.cartExp?.type === "required" && (
                    <p className="text-danger">This field is required.</p>
                  )}
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={3}
                    minLength={3}
                    placeholder="CVV"
                    required
                    {...register("cartCvv", {
                      required: true,
                      maxLength: 3,
                      minLength: 3,
                      pattern: /^[0-9]*$/i,
                    })}
                  />
                  {errors.cartCvv?.type === "maxLength" ||
                    (errors.cartCvv?.type === "minLength" && (
                      <p className="text-danger">CVV should be 3 digits.</p>
                    ))}
                  {errors.cartCvv?.type === "pattern" && (
                    <p className="text-danger">Numerical characters only.</p>
                  )}
                  {errors.cartCvv?.type === "required" && (
                    <p className="text-danger">This field is required.</p>
                  )}
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                {...register("terms", {
                  required: true,
                })}
              />

              {errors.terms?.type === "required" && (
                <p className="text-danger">
                  Need to accept the agreement to terms and conditions.
                </p>
              )}
            </Form.Group>
            <Row>
              <Button variant="primary" type="submit">
                Checkout
              </Button>
            </Row>
          </Form>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ordered!</Modal.Title>
        </Modal.Header>
        <Modal.Body>We have reicived your order. Thanks!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              navigate("/");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
