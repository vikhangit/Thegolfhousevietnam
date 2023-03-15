import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Nav, Navbar } from "rsuite";
import HeaderMoblieBlack from "../HeaderMobileBlack/HeaderMobileBlack";

export default function HeaderAccademy({
  onSelect,
  visible,
  activeKey,
  cart,
  handleShowRightMenu,
  handleShowSearch,
  handleShowCart,
  ...props
}) {
  const token = Cookies.get("access_token");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // useEffect(() => {
  //   $(".rs-navbar-item").each(function (index) {
  //     $(".rs-navbar-item").on("click", function () {
  //       $(".sub-child").attr("data-aos", "fade-left");
  //     });
  //   });
  // }, []);
  return (
    <>
      <div id="navbar-academy">
        <Navbar {...props} className="custom-nav" data-aos="fade-down">
          <div className="">
            <Nav onSelect={onSelect} activeKey={activeKey}>
              <Navbar.Brand
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                <Image
                  alt="logo"
                  src="/images/Logo/Logo12.png"
                  width={104}
                  height={95}
                />
              </Navbar.Brand>
              <div className="d-flex justify-content-center align-items-center">
                <div className="left d-flex">
                  <Nav.Item
                    eventKey="1"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/");
                    }}
                  >
                    Trang chủ
                  </Nav.Item>
                  <Nav.Menu
                    title="Về Chúng Tôi"
                    onClick={() => {
                      router.push("/about-us");
                    }}
                  >
                    <Nav.Item
                      eventKey="2"
                      onClick={() => {
                        localStorage.setItem("id_url", "founder");
                        router.push("/about-us");
                      }}
                    >
                      Nhà sáng lập
                    </Nav.Item>
                    <Nav.Item
                      eventKey="3"
                      onClick={() => {
                        localStorage.setItem("id_url", "about-us");
                        router.push("/about-us");
                      }}
                    >
                      Lio Holding
                    </Nav.Item>
                    <Nav.Item
                      eventKey="4"
                      onClick={() => {
                        router.push("/news-events");
                      }}
                    >
                      Tin tức, sự kiện
                    </Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    title="Học Viện"
                    onClick={(e) => {
                      router.push("/academy");
                    }}
                  >
                    <Nav.Item
                      eventKey="5"
                      onClick={(e) => {
                        router.push("/trainer");
                      }}
                    >
                      Huấn Luyện Viên
                    </Nav.Item>
                    <Nav.Item
                      eventKey="6"
                      onClick={() => {
                        router.push("/training");
                      }}
                    >
                      Đào tạo
                    </Nav.Item>
                  </Nav.Menu>
                  <Nav.Item
                    eventKey="7"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/proshop");
                    }}
                  >
                    Proshop
                  </Nav.Item>
                  <Nav.Item
                    eventKey="8"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/spa");
                    }}
                  >
                    Spa
                  </Nav.Item>
                  <Nav.Item
                    eventKey="9"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/lounge");
                    }}
                  >
                    Lounge
                  </Nav.Item>
                  <Nav.Item
                    eventKey="10"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/contact-us");
                    }}
                  >
                    Liên hệ
                  </Nav.Item>
                </div>
                <div className="right d-flex">
                  <Nav.Item eventKey="12" onClick={handleShowCart}>
                    <div className="cart">
                      <i className="fa-light fa-bag-shopping"></i>
                      {token && cart.length > 0 ? (
                        <span className="d-flex justify-content-center align-items-center">
                          {cart.length}
                        </span>
                      ) : null}
                    </div>
                  </Nav.Item>

                  <Nav.Item eventKey="14" className="sub-menu">
                    <i className="fa-solid fa-grid"></i>
                  </Nav.Item>
                </div>
              </div>
            </Nav>
          </div>
        </Navbar>
      </div>
      <HeaderMoblieBlack
        visible={visible}
        cart={cart}
        handleShowCart={handleShowCart}
        handleShowSearch={handleShowSearch}
      />
    </>
  );
}
