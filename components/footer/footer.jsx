import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import styles from "./footer.module.scss";

function Footer(props) {
  return (
    <div className={styles.footer} id="footer">
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <div className={styles.logo}>
            <Image
              alt="logo"
              src="/images/Logo/Logo12.png"
              width={104}
              height={87}
            />
          </div>
          <div className={styles.menu + " " + "d-flex"}>
            <div className={styles.menu_item}>Trang chủ</div>
            <div className={styles.menu_item}>Về chúng tôi</div>
            <div className={styles.menu_item}>Giới thiệu</div>
            <div className={styles.menu_item}>Proshop</div>
            <div className={styles.menu_item}>Dịch vụ khác</div>
            <div className={styles.menu_item}>Liên hệ</div>
          </div>
          <div className={styles.social + " " + "d-flex"}>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-dribbble"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
        <div className={styles.copy_right}>
          <p>
            <strong>Thegolfhousevietnam</strong> &#169; 2022. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
