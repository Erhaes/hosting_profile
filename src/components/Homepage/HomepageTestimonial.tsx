'use client';

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import apiClient from "@/services/apiClient";
import { Review } from "@/types";

export default function HomepageTestimonial() {
    // Create a state to track client-side mounting
    const [isMounted, setIsMounted] = useState(false);
    const container1Ref = useRef<HTMLDivElement>(null);
    const container2Ref = useRef<HTMLDivElement>(null);
    const animationRef1 = useRef<number | undefined>(undefined);
    const animationRef2 = useRef<number | undefined>(undefined);
    const currentOffset1 = useRef<number>(0);
    const currentOffset2 = useRef<number>(0);
    let scrollSpeed = 0.3;
    let animationDuration = 5; // default duration for large screens

    const [direction1, setDirection1] = useState<
        "up" | "down" | "left" | "right"
    >("up");
    const [direction2, setDirection2] = useState<
        "up" | "down" | "left" | "right"
    >("down");
    
    // Use state instead of direct hook for isLargeScreen
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    // Use this for the media query
    const isLargeScreenQuery = useMediaQuery({ minWidth: 1024 }, undefined, (match) => {
        if (isMounted) setIsLargeScreen(match);
    });

    // State untuk data review dari API
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Set the initial state after mount
    useEffect(() => {
        setIsMounted(true);
        setIsLargeScreen(isLargeScreenQuery);
    }, [isLargeScreenQuery]);

    // Fetch data review dari API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get("/review");
                setReviews(response.data.data || response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
                setError("Gagal memuat data testimonial.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (!isLargeScreen) {
        animationDuration = 10;
        scrollSpeed = 0.5; // slower speed for smaller screens
    }

    // Split reviews into two arrays for scrolling
    const reviews1 = reviews.slice(0, Math.ceil(reviews.length / 2));
    const reviews2 = reviews.slice(Math.ceil(reviews.length / 2));

    const startLoopScroll = (
        container: HTMLDivElement | null,
        direction: "up" | "down" | "left" | "right",
        currentOffset: React.MutableRefObject<number>,
        animationRef: React.MutableRefObject<number | undefined>,
        isVertical: boolean
    ) => {
        if (!container) return;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        const contentSize = isVertical
            ? container.scrollHeight
            : container.scrollWidth;
        const containerSize = isVertical
            ? container.clientHeight
            : container.clientWidth;

        const animate = () => {
            if (isVertical) {
                currentOffset.current +=
                    direction === "up" ? scrollSpeed : -scrollSpeed;
                if (direction === "up" && currentOffset.current >= containerSize)
                    currentOffset.current = -contentSize;
                if (direction === "down" && currentOffset.current <= -contentSize)
                    currentOffset.current = containerSize;
                container.style.transform = `translateY(${currentOffset.current}px)`;
            } else {
                currentOffset.current +=
                    direction === "left" ? scrollSpeed : -scrollSpeed;
                if (direction === "left" && currentOffset.current >= containerSize)
                    currentOffset.current = -contentSize;
                if (direction === "right" && currentOffset.current <= -contentSize)
                    currentOffset.current = containerSize;
                container.style.transform = `translateX(${currentOffset.current}px)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    useEffect(() => {
        if (!isMounted) return;
        
        const verticalDirection1 =
            direction1 === "left"
                ? "up"
                : direction1 === "right"
                ? "down"
                : direction1;
        const verticalDirection2 =
            direction2 === "left"
                ? "up"
                : direction2 === "down"
                ? "right"
                : direction2;
        const horizontalDirection1 =
            direction1 === "up"
                ? "left"
                : direction1 === "down"
                ? "right"
                : direction1;
        const horizontalDirection2 =
            direction2 === "up"
                ? "left"
                : direction2 === "down"
                ? "right"
                : direction2;

        startLoopScroll(
            container1Ref.current,
            isLargeScreen ? verticalDirection1 : horizontalDirection1,
            currentOffset1,
            animationRef1,
            isLargeScreen
        );
        startLoopScroll(
            container2Ref.current,
            isLargeScreen ? verticalDirection2 : horizontalDirection2,
            currentOffset2,
            animationRef2,
            isLargeScreen
        );

        const interval = setInterval(() => {
            if (isLargeScreen) {
                setDirection1((prev) => (prev === "up" ? "down" : "up"));
                setDirection2((prev) => (prev === "up" ? "down" : "up"));
            } else {
                setDirection1((prev) => (prev === "left" ? "right" : "left"));
                setDirection2((prev) => (prev === "right" ? "left" : "right"));
            }
        }, animationDuration * 1000);

        return () => {
            clearInterval(interval);
            if (animationRef1.current) cancelAnimationFrame(animationRef1.current);
            if (animationRef2.current) cancelAnimationFrame(animationRef2.current);
        };
    }, [direction1, direction2, isLargeScreen, isMounted]);

    // Loading state
    if (loading) {
        return (
            <section
                id="testimoni"
                className="section-padding-x pt-12 pb-12 dark:text-light-base text-light-base bg-dark-base lg:max-h-[512px] overflow-hidden scroll-mt-12 gradient-to-r from-dark-base to-sipil-secondary/10 dark:from-slate-900 dark:to-sipil-secondary/20 bg-gradient-to-br"
            >
                <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between gap-8">
                    <div className="max-w-xl">
                        <p className="text-sipil-base">Testimoni Pengujian</p>
                        <h2 className="font-bold mb-2">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300 mb-4">
                            Laboratorium Teknik Sipil Unsoed selalu berupaya memberikan hasil pengujian yang akurat dan didukung tim ahli yang siap menjadi mitra kesuksesan teknis Anda.
                        </p>
                        <a
                            href="#"
                            className="text-light-base gradient-to-r from-sipil-base to-sipil-secondary bg-gradient-to-br px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold small-font-size"
                        >
                            Reservasi Sekarang Juga!
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                            <p>Memuat testimonial...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section
                id="testimoni"
                className="section-padding-x pt-12 pb-12 dark:text-light-base text-light-base bg-dark-base lg:max-h-[512px] overflow-hidden scroll-mt-12 gradient-to-r from-dark-base to-sipil-secondary/10 dark:from-slate-900 dark:to-sipil-secondary/20 bg-gradient-to-br"
            >
                <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between gap-8">
                    <div className="max-w-xl">
                        <p className="text-sipil-base">Testimoni Pengujian</p>
                        <h2 className="font-bold mb-2">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300 mb-4">
                            Laboratorium Teknik Sipil Unsoed selalu berupaya memberikan hasil pengujian yang akurat dan didukung tim ahli yang siap menjadi mitra kesuksesan teknis Anda.
                        </p>
                        <a
                            href="#"
                            className="text-light-base gradient-to-r from-sipil-base to-sipil-secondary bg-gradient-to-br px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold small-font-size"
                        >
                            Reservasi Sekarang Juga!
                        </a>
                    </div>
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="testimoni"
            className="section-padding-x pt-12 pb-12 dark:text-light-base text-light-base bg-dark-base lg:max-h-[512px] overflow-hidden scroll-mt-12 gradient-to-r from-dark-base to-sipil-secondary/10 dark:from-slate-900 dark:to-sipil-secondary/20 bg-gradient-to-br"
        >
            <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between gap-8">
                <div className="max-w-xl">
                    <p className="text-sipil-base">Testimoni Pengujian</p>
                    <h2 className="font-bold mb-2">
                        Apa Kata Mereka?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 mb-4">
                        Laboratorium Teknik Sipil Unsoed selalu berupaya memberikan hasil pengujian yang akurat dan didukung tim ahli yang siap menjadi mitra kesuksesan teknis Anda.
                    </p>
                    <a
                        href="#"
                        className="text-light-base gradient-to-r from-sipil-base to-sipil-secondary bg-gradient-to-br px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold small-font-size"
                    >
                        Reservasi Sekarang Juga!
                    </a>
                </div>
                
                {/* Only render the scrolling sections after client-side mount */}
                {isMounted && reviews.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div
                            className="flex flex-row-reverse lg:flex-col gap-4 w-full lg:w-auto"
                            ref={container1Ref}
                            style={{ whiteSpace: isLargeScreen ? "normal" : "nowrap" }}
                        >
                            {reviews1.map((review, index) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    isHorizontal={!isLargeScreen}
                                />
                            ))}
                        </div>
                        <div
                            className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto"
                            ref={container2Ref}
                            style={{ whiteSpace: isLargeScreen ? "normal" : "nowrap" }}
                        >
                            {reviews2.map((review, index) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    isHorizontal={!isLargeScreen}
                                />
                            ))}
                        </div>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>Tidak ada testimonial yang tersedia</p>
                    </div>
                ) : (
                    // Static placeholder content for server-side rendering
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col gap-4 w-full lg:w-auto">
                            <div className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-2xl relative group">
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full lg:w-auto">
                            <div className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-2xl relative group">
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

const ReviewCard = ({
    review,
    isHorizontal,
}: {
    review: Review;
    isHorizontal?: boolean;
}) => {
    // Function to render stars based on rating
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${
                        i <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div
            className={`flex ${
                isHorizontal ? "min-w-[300px]" : ""
            } flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-2xl relative group`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="w-8 absolute text-sipil-base top-4 right-4 opacity-50 group-hover:opacity-100 transition-all duration-300"
            >
                <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z" />
            </svg>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-2">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({review.rating}/5)
                </span>
            </div>
            
            <p className="text-gray-900 dark:text-gray-100 small-font-size text-wrap">
                {review.content}
            </p>
        </div>
    );
};