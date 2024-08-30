import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import './CategoriesSlider.css';  // Make sure to create and import this CSS file

export default function CategoriesSlider() {
    const [categoriesprod, setcategoriesprod] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Default number of slides to show
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024, // Large screens
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768, // Medium screens
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480, // Small screens
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    async function getcategories() {
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
            setcategoriesprod(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getcategories();
    }, []);

    return (
        <>
            <h2 className='text-xl text-white text-center mb-4'>Shop Popular Categories</h2>
            <Slider {...settings}>
                {categoriesprod.map((prod, index) => (
                    <div key={index} className='slider-item'>
                        <div className="row md:w-6/6">
                            <img src={prod.image} alt={prod.name} className='slider-img' />
                            <p className='slider-text text-white'>{prod.name}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
}
