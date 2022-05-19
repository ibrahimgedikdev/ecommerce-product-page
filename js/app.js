$(document).ready(function () {
  const images = [
    {
      feature: "image-product-1.jpg",
      thumbnail: "image-product-1-thumbnail.jpg",
    },
    {
      feature: "image-product-2.jpg",
      thumbnail: "image-product-2-thumbnail.jpg",
    },
    {
      feature: "image-product-3.jpg",
      thumbnail: "image-product-3-thumbnail.jpg",
    },
    {
      feature: "image-product-4.jpg",
      thumbnail: "image-product-4-thumbnail.jpg",
    },
  ];

  var mobileNavbar = $(".mobile__navbar");
  var toggleBtn = $("#toggleBtn");
  var closeMenuBtn = $("#closeMenuBtn");
  var menuOverlay = $(".menu__overlay");

  var cartButton = $(".cart__button");
  var cartModal = $(".cart__modal");

  if (cartButton.length > 0) {
    cartButton.click(function () {
      cartModal.slideToggle();
    });
  }

  if (mobileNavbar.length > 0) {
    toggleBtn.click(function () {
      mobileNavbar.addClass("active");
      menuOverlay.addClass("active");
    });
    closeMenuBtn.click(function () {
      mobileNavbar.removeClass("active");
      menuOverlay.removeClass("active");
    });
  }


  $(window).click(function (e) {
    var target = e.target;
    if (
      !target.closest("#addCartBtn") &&
      !target.closest("#deleteProduct") &&
      !target.closest(".navbar")
    ) {
      cartModal.slideUp();
    }
  });

  var featureImage = $(".feature__image");
  var thumbnail = $(".thumbnail");

  if (featureImage.length > 0) {
    thumbnail.each(function () {
      $(this).click(function () {
        var thumbnailImage = $(this).children();
        var thumbnailImageSrc = thumbnailImage.attr("data-feature-src");
        thumbnail.removeClass("active");
        $(this).addClass("active");
        featureImage.attr("src", thumbnailImageSrc);
      });
    });
  }

  var lightbox = $(".lightbox");
  var closeLightboxBtn = $("#closeLightboxBtn");
  var lightboxIndex = 0;
  var lightboxItem = $(".lightbox__item");
  var lightboxPrev = $("#lightboxPrev");
  var lightboxNext = $("#lightboxNext");
  var lightboxThumbnail = $(".lightbox__thumbnail");

  if (lightbox.length > 0) {
    featureImage.click(function (e) {
      lightbox.addClass("active");
    });
    closeLightboxBtn.click(function () {
      lightbox.removeClass("active");
    });

    lightboxPrev.click(function () {
      var lightboxImage = lightboxItem.children();
      lightboxIndex--;
      if (lightboxIndex < 1) {
        lightboxIndex = images.length - 1;
      }
      lightboxThumbnail.removeClass("active");
      lightboxThumbnail.eq(lightboxIndex).addClass("active");
      lightboxImage.attr("src", "images/" + images[lightboxIndex].feature);
    });

    lightboxNext.click(function () {
      var lightboxImage = lightboxItem.children();
      lightboxIndex++;
      if (lightboxIndex > images.length - 1) {
        lightboxIndex = 0;
      }
      lightboxThumbnail.removeClass("active");
      lightboxThumbnail.eq(lightboxIndex).addClass("active");
      lightboxImage.attr("src", "images/" + images[lightboxIndex].feature);
    });

    lightboxThumbnail.each(function () {
      var lightboxImage = lightboxItem.children();
      $(this).click(function () {
        lightboxIndex = $(this).index();
        var thumbnailImage = $(this).children();
        var thumbnailImageSrc = thumbnailImage.attr("data-feature-src");
        lightboxThumbnail.removeClass("active");
        $(this).addClass("active");
        lightboxImage.attr("src", thumbnailImageSrc);
      });
    });
  }

  var increaseButton = $("#increaseBtn");
  var decreaseBtn = $("#decreaseBtn");

  if (increaseButton.length > 0) {
    increaseButton.click(function () {
      console.log($(this).next().val());
      if ($(this).next().val() > 1) {
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
      }
    });
  }
  if (decreaseBtn.length > 0) {
    decreaseBtn.click(function () {
      if ($(this).prev().val() < 10) {
        $(this)
          .prev()
          .val(+$(this).prev().val() + 1);
      }
    });
  }

  var product = $(".cart__body .product");
  var addCartBtn = $("#addCartBtn");
  var cartModalBody = $(".cart__body");
  var cartModalBodyHtml = "";

  addCartBtn.click(function () {
    var productName = $(".product__row .product__name").text();
    var productImage = $(".thumbnail").eq(0).children().attr("src");
    var productPrice = $(".product__row .new__price").text().split("$")[1];
    var productQuantity = $('input[name="quantity"]').val();
    var total = parseInt(productPrice) * parseInt(productQuantity);

    cartModalBodyHtml = `
        <div class="product">
            <div class="cart__body__left">
                <img
                src="${productImage}"
                alt="Product Image"
                class="product__image"
                />
            </div>
            <div class="cart__body__center">
                <span class="product__name">${productName}</span>
                <span class="product__price">$${productPrice} x <span class="product__quantity">${productQuantity}</span> <b>$${total}</b></span>
            </div>
            <div class="cart__body__right">
                <button class="btn delete__icon" id="deleteProduct">
                <span class="icon-icon-delete"></span>
                </button>
            </div>
        </div> 
      `;

    if (productName == $(".cart__body .product__name").text()) {
      var oldQuantity = parseInt($(".cart__body .product__quantity").text());
      var productQuantity = parseInt(productQuantity);
      var newQuantity = oldQuantity + productQuantity;
      var total = productPrice * newQuantity;
      $(".cart__body .product__price").html(`
          <span class="product__price">$${productPrice} x <span class="product__quantity">${newQuantity}</span> <b>$${total}</b></span>
          `);
    } else {
      cartModalBody.html(cartModalBodyHtml);
    }
    $(".product__length").addClass("active");
    $(".product__length").text("1");
    cartModal.slideDown();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
  cartModalBody.click(function (e) {
    if (e.target.id == "deleteProduct") {
      product.remove();
      cartModalBody.html("<h4>Your cart is empty !</h4>");
      $(".product__length").removeClass("active");
      $(".product__length").text("0");
    }
  });
});
