import { yupResolver } from "@hookform/resolvers/yup";
import $ from "jquery";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "rsuite";
import Swal from "sweetalert2";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";
import loginClientAxios from "../../../clientAxios/loginClientAxios";
import SignIn from "../../../components/Modal/SignIn";
import {
  AddToCart,
  getCartData,
  UdateProductInCart,
} from "../../../store/redux/CartReducer/cart.action";
import { getProshopData } from "../../../store/redux/ProshopReducer/proshop.action";
import ProshopAPI from "../../../store/redux/ProshopReducer/proshop.api";
import { removeAccents } from "../../../utils/function";
import styles from "./detail.module.scss";
import TabDescription from "./TabDescription/TabDescription";
const schema2 = yup.object().shape({
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  password: yup.string().required("Mật khẩu là trường bắt buộc"),
});
function Detail(props) {
  const router = useRouter();
  const [ProshopData, setProshopData] = useState();

  const token = Cookies.get("access_token");
  const cate = Cookies.get("Pro_DM");
  const page = Cookies.get("page_shop");
  const name = Cookies.get("name");
  const gender = Cookies.get("gender");
  const size = Cookies.get("size");
  const brand = Cookies.get("brand");
  const price_min = Cookies.get("price_min");
  const price_max = Cookies.get("price_max");
  const dateNewest = Cookies.get("date_newest");
  const price_Incresss = Cookies.get("price_incresss");

  useEffect(() => {
    ProshopAPI.getProshopAPI(
      page,
      cate,
      name,
      gender,
      size,
      brand,
      price_min,
      price_max,
      dateNewest,
      price_Incresss
    )
      .then((rs) => setProshopData(rs?.data))
      .catch((err) => setProshopData([]));
  }, [
    cate,
    page,
    name,
    gender,
    size,
    brand,
    price_min,
    price_max,
    dateNewest,
    price_Incresss,
  ]);

  const proshopDetail = ProshopData?.find(
    (x) => removeAccents(x?.ma_vt) === router.query.name
  );

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(schema2),
  });

  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);

  const onSubmit2 = async (data) => {
    setLoading(true);
    const resApi = await loginClientAxios.post("/user/login", {
      username: data.phone,
      password: data.password,
    });
    setTimeout(() => {
      if (resApi?.result?.message?.length > 0) {
        Swal.fire({
          text: `${resApi.result.message}`,
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Đồng ý",
        });
        setLoading(false);
      } else if (resApi?.result) {
        setLoading(false);
        Cookies.set("access_token", resApi?.result?.access_token);
        Cookies.set("trainee_id", resApi?.result?.id);
        Cookies.set("erp_token", resApi?.result?.erp_token);
        setOpen2(false);
      }
    }, 2000);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer.cartList);
  useEffect(() => {
    dispatch(getCartData());
    dispatch(getProshopData());
  }, []);

  const [qty, setQty] = useState(1);
  const decreasement = () => {
    setQty(qty - 1);
    if (qty <= 1) {
      Swal.fire({
        title: "Lỗi",
        text: "Số lượng phải lớn hơn 0",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          setQty(1);
        }
      });
    }
  };

  const pictureArray = (data) => {
    let arr = [];
    if (data?.picture) {
      arr.push({
        id: 1,
        url: data.picture,
      });
    }
    if (data?.picture2) {
      arr.push({
        id: 2,
        url: data.picture2,
      });
    }
    if (data?.picture3) {
      arr.push({
        id: 3,
        url: data.picture3,
      });
    }
    if (data?.picture4) {
      arr.push({
        id: 4,
        url: data.picture4,
      });
    }
    return arr;
  };

  useEffect(() => {
    pictureArray(proshopDetail)?.map((x, i) =>
      $("#proshop-detail .swiper-pagination-bullet").each(function (indexC) {
        $(this).css({
          backgroundImage:
            indexC === i &&
            `url(https://api.fostech.vn${x.url}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93)`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 1,
        });
      })
    );
  }, [proshopDetail]);

  const handleAddToCart = (item) => {
    if (token && token?.length > 0) {
      setLoadingAddToCart(true);
      // const cart = getLocalStorage(LOCAL_STORAGE.CART);
      const find = cart.findIndex((x) => x.ma_vt === item.ma_vt);
      if (find < 0) {
        setTimeout(() => {
          setLoadingAddToCart(false);
          dispatch(
            AddToCart({
              ma_vt: item?.ma_vt,
              ma_dvt: item?.ma_dvt,
              sl_xuat: qty,
              // tien_nt: 200000,
              // tien: 200000,
              // gia_ban: 10000,
              // gia_ban_le: 10000,
            })
          );
          setTimeout(() => {
            setTimeout(() => {
              dispatch(getCartData());
            }, 500);
            setQty(1);
          }, 1000);
        }, 1300);
      } else {
        setTimeout(() => {
          setLoadingAddToCart(false);
          dispatch(
            UdateProductInCart(cart[find]?._id, {
              ...cart[find],
              sl_xuat: cart[find]?.sl_xuat + qty,
            })
          );
          setTimeout(() => {
            setTimeout(() => {
              dispatch(getCartData());
            }, 200);
            setQty(1);
          }, 1000);
        }, 1300);
      }
    } else {
      handleOpen2();
    }
  };

  const handleBuyNow = (item) => {
    if (token && token?.length > 0) {
      setLoadingBuyNow(true);
      // const cart = getLocalStorage(LOCAL_STORAGE.CART);
      const find = cart.findIndex((x) => x.ma_vt === item.ma_vt);
      if (find < 0) {
        setTimeout(() => {
          setLoadingBuyNow(false);
          dispatch(
            AddToCart({
              ma_vt: item?.ma_vt,
              ma_dvt: item?.ma_dvt,
              sl_xuat: qty,
              // tien_nt: 200000,
              // tien: 200000,
              // gia_ban: 10000,
              // gia_ban_le: 10000,
            })
          );
          setTimeout(() => {
            setTimeout(() => {
              dispatch(getCartData());
            }, 500);
            setQty(1);
          }, 1000);
        }, 1300);
      } else {
        setTimeout(() => {
          setLoadingBuyNow(false);
          dispatch(
            UdateProductInCart(cart[find]?._id, {
              ...cart[find],
              sl_xuat: cart[find]?.sl_xuat + qty,
            })
          );
          setTimeout(() => {
            setTimeout(() => {
              dispatch(getCartData());
            }, 200);
            setQty(1);
          }, 1000);
        }, 1300);
      }
    } else {
      handleOpen2();
    }
  };

  useEffect(() => {
    if (token && token?.length > 0) {
      setTimeout(() => {
        $("#add-cart").on("click", function () {
          var cart = $(".cart");
          var imgtodrag = $("#image-proshop-detail").eq(0);

          if (imgtodrag) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: "0.5",
                position: "absolute",
                height: "150px",
                width: "150px",
                "z-index": "4000",
              })
              .appendTo($("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                1000,
                "easeInOutExpo"
              );

            setTimeout(function () {
              cart.effect(
                "shake",
                {
                  times: 2,
                },
                200
              );
            }, 1000);

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                $(this).detach();
              }
            );
          }
        });
      }, 4000);
    }
  }, [token]);

  return (
    <div className={styles.detail_page} id="detail-page">
      {!proshopDetail ? (
        <div className="container">
          <Loader
            size="md"
            style={{
              marginBottom: 40,
            }}
            content="Đang tải dữ liệu..."
          />
        </div>
      ) : (
        <div className="container">
          <div
            className="d-flex flex-wrap justify-content-start top"
            id="proshop-detail"
          >
            <div className="col-12 col-lg-6 slide">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {pictureArray(proshopDetail)?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="image" id="image-proshop-detail">
                      <Image
                        alt={"Image" + index + 1}
                        src={item.url}
                        loader={({ src }) =>
                          `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
                        }
                        // width={300}
                        // height={300}
                        layout="fill"
                        objectFit={"cover"}
                      ></Image>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-12 col-lg-6 content">
              <h2>{proshopDetail?.ten_vt}</h2>
              <div className="d-flex flex-wrap justify-content-lg-between align-items-center justify-content-start">
                <p className="price">
                  {proshopDetail?.gia_ban_le?.toLocaleString("vi-Vi")} VND
                </p>
              </div>
              <p>
                Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit
                odit aut fugit, sed quia consequuntur. Lorem ipsum dolor. Aquia
                sit amet, elitr, sed diam nonum eirmod tempor invidunt labore et
                dolore.
              </p>
              <div className="d-flex flex-wrap tool">
                <div className="col-12 quantity d-flex flex-row justify-content-around align-items-center">
                  <i className="fa-light fa-minus" onClick={decreasement}></i>
                  <span>{qty}</span>
                  <i
                    className="fa-light fa-plus"
                    onClick={() => setQty(qty + 1)}
                  ></i>
                </div>

                <div className="col-12 d-flex flex-row">
                  <div className="button2">
                    <button
                      onClick={() => {
                        handleAddToCart(proshopDetail);
                      }}
                      id="add-cart"
                    >
                      {loadingAddToCart ? (
                        <Loader content="Đang xử lý" />
                      ) : (
                        "Thêm vào giỏ hàng"
                      )}
                      <span className="cart-item"></span>
                    </button>
                  </div>

                  <div className="button ms-4">
                    <button
                      onClick={() => {
                        handleBuyNow(proshopDetail);
                        router.push("/cart");
                      }}
                      id="add-cart"
                    >
                      {loadingBuyNow ? (
                        <Loader content="Đang xử lý" />
                      ) : (
                        "Mua ngay"
                      )}
                      <span className="cart-item"></span>
                    </button>
                  </div>

                  <i className="fa-light fa-heart"></i>
                </div>
                {open2 && (
                  <SignIn handleClose={handleClose2} setOpen={setOpen2} />
                )}
              </div>
              <div className="bonus">
                <p>
                  <strong>Danh mục:</strong> {proshopDetail?.ten_nvt}
                </p>
                <p>
                  <strong>Thẻ:</strong> Giảm giá, Mới
                </p>
                <p>
                  <strong>Mã sản phẩm:</strong> {proshopDetail?.ma_vt}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="Tabs" id="proshop-detail-tabs">
              <Tabs
                defaultActiveKey="info"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="info" title="Thông tin sản phẩm">
                  <TabDescription proshopDetail={proshopDetail} />
                </Tab>
                <Tab eventKey="policy" title="Chính sách bán hàng">
                  <TabDescription proshopDetail={proshopDetail} />
                </Tab>
                <Tab eventKey="rate" title="Đánh giá">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    provident doloribus sunt aliquid et, alias dicta beatae,
                    laborum nam perspiciatis suscipit reprehenderit. Hic
                    sapiente impedit ad? Ratione alias maiores odio?
                  </p>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
