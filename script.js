/* =========================================================
   Mars Softworks
   منطق گالری Mars Print و Lightbox
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       اطلاعات تصاویر Mars Print
       ===================================================== */

    const galleryImages = [
        {
            src: "assets/images/products/mars_print/1.png",
            alt: "نمای اصلی نرم‌افزار Mars Print"
        },

        {
            src: "assets/images/products/mars_print/2.png",
            alt: "نمای دوم نرم‌افزار Mars Print"
        },

        {
            src: "assets/images/products/mars_print/3.png",
            alt: "نمای سوم نرم‌افزار Mars Print"
        },

        {
            src: "assets/images/products/mars_print/4.png",
            alt: "نمای چهارم نرم‌افزار Mars Print"
        },

        {
            src: "assets/images/products/mars_print/5.png",
            alt: "نمای پنجم نرم‌افزار Mars Print"
        }
    ];


    /* =====================================================
       عناصر گالری
       ===================================================== */

    const mainImage = document.getElementById(
        "marsPrintMainImage"
    );

    const thumbnails = document.querySelectorAll(
        ".mars-print-thumbnail"
    );


    /* =====================================================
       عناصر Lightbox
       ===================================================== */

    const lightbox = document.getElementById(
        "marsPrintLightbox"
    );

    const lightboxImage = document.getElementById(
        "marsPrintLightboxImage"
    );

    const lightboxClose = document.getElementById(
        "marsPrintLightboxClose"
    );

    const lightboxPrev = document.getElementById(
        "marsPrintLightboxPrev"
    );

    const lightboxNext = document.getElementById(
        "marsPrintLightboxNext"
    );

    const lightboxCounter = document.getElementById(
        "marsPrintLightboxCounter"
    );


    /* =====================================================
       وضعیت فعلی گالری
       ===================================================== */

    let currentIndex = 0;


    /* =====================================================
       تغییر تصویر اصلی
       ===================================================== */

    function setGalleryImage(index) {

        if (!mainImage) {
            return;
        }

        if (!galleryImages[index]) {
            return;
        }

        currentIndex = index;

        mainImage.src =
            galleryImages[index].src;

        mainImage.alt =
            galleryImages[index].alt;


        /* ---------------------------------------------
           فعال کردن Thumbnail انتخاب‌شده
           --------------------------------------------- */

        thumbnails.forEach((thumbnail, thumbnailIndex) => {

            thumbnail.classList.toggle(
                "active",
                thumbnailIndex === index
            );

        });

    }


    /* =====================================================
       باز کردن Lightbox
       ===================================================== */

    function openLightbox(index) {

        if (!lightbox || !lightboxImage) {
            return;
        }

        if (!galleryImages[index]) {
            return;
        }

        currentIndex = index;

        lightboxImage.src =
            galleryImages[index].src;

        lightboxImage.alt =
            galleryImages[index].alt;


        if (lightboxCounter) {

            lightboxCounter.textContent =
                `${index + 1} / ${galleryImages.length}`;

        }


        lightbox.classList.add(
            "open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        /* جلوگیری از اسکرول صفحه هنگام نمایش تصویر */

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       بستن Lightbox
       ===================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove(
            "open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        /* بازگرداندن اسکرول صفحه */

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       تصویر قبلی
       ===================================================== */

    function showPreviousImage() {

        const previousIndex =
            (currentIndex - 1 + galleryImages.length)
            % galleryImages.length;

        openLightbox(
            previousIndex
        );

        setGalleryImage(
            previousIndex
        );

    }


    /* =====================================================
       تصویر بعدی
       ===================================================== */

    function showNextImage() {

        const nextIndex =
            (currentIndex + 1)
            % galleryImages.length;

        openLightbox(
            nextIndex
        );

        setGalleryImage(
            nextIndex
        );

    }


    /* =====================================================
       کلیک روی Thumbnailها
       ===================================================== */

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        thumbnail.dataset.galleryIndex
                    );

                setGalleryImage(
                    index
                );

            }
        );

    });


    /* =====================================================
       کلیک روی تصویر اصلی
       ===================================================== */

    if (mainImage) {

        mainImage.addEventListener(
            "click",
            () => {

                openLightbox(
                    currentIndex
                );

            }
        );

    }


    /* =====================================================
       دکمه بستن
       ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       دکمه تصویر قبلی
       ===================================================== */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );

    }


    /* =====================================================
       دکمه تصویر بعدی
       ===================================================== */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextImage
        );

    }


    /* =====================================================
       کلیک روی فضای بیرون تصویر
       ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox ||
                    event.target.classList.contains(
                        "mars-lightbox-backdrop"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       کنترل با صفحه‌کلید
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox ||
                !lightbox.classList.contains("open")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

                return;

            }


            if (event.key === "ArrowLeft") {

                showNextImage();

                return;

            }


            if (event.key === "ArrowRight") {

                showPreviousImage();

            }

        }
    );


    /* =====================================================
       مقدار اولیه
       ===================================================== */

    setGalleryImage(
        0
    );

});