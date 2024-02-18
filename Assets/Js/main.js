let totalPrice = 0
let count = 0
const selectedSeat = document.querySelectorAll(".selected-btn")

for (const seat of selectedSeat) {
	seat.addEventListener("click", function (e) {
		// check if seat are full
		if (count >= 4) {
			alert("You cannot select more than 4 seat")
		} else {
			// color the selected seat and disable it
			if (!seat.classList.contains("disabled")) {
				seat.classList.add("disabled")
				seat.style.backgroundColor = "#1DD100"
				seat.querySelector("p").classList.remove("text-[#03071280]")
				seat.querySelector("p").classList.add("text-white")
			}

			// get the seat number text
			const seatNumberText = seat.querySelector("p").innerText
			// create the seat number
			const selectedSeatNumber = document.createElement("p")
			selectedSeatNumber.innerText = seatNumberText
			selectedSeatNumber.classList.add("seat-class")
			// create the seat class
			const seatClass = document.createElement("p")
			seatClass.innerText = "Economy"
			seatClass.classList.add("seat-class")
			// create the seat price
			const seatPrice = document.createElement("p")
			seatPrice.innerText = "550"
			seatPrice.classList.add("seat-class")
			// create the seat div
			const seatDiv = document.createElement("div")
			seatDiv.classList.add("selected-seats-div")

			const selectedSeatsContainer = document.getElementById("selected-seats-container")

			seatDiv.appendChild(selectedSeatNumber)
			seatDiv.appendChild(seatClass)
			seatDiv.appendChild(seatPrice)

			selectedSeatsContainer.appendChild(seatDiv)
			// available seat
			const availableSeat = document.getElementById("available-seat").innerText
			const convertedAvailableSeat = parseInt(availableSeat)

			// count the seat
			count++
			document.getElementById("seat-count").innerText = count

			// available seat
			document.getElementById("available-seat").innerText = convertedAvailableSeat - 1

			// converted seat price into number
			const convertedSeatPrice = parseInt(seatPrice.innerText)

			// calculate price
			totalPrice += convertedSeatPrice
			document.getElementById("total-price").innerText = totalPrice

			// calculate grand total
			const grandTotal = document.getElementById("grand-total")
			grandTotal.innerText = totalPrice

			// check if seats are 4 than open the coupon box
			if (count >= 4) {
				document.getElementById("coupon-code").disabled = false
				couponBtn.disabled = false
			}
		}
	})
}

// validate the phone number and at least one seat is selected
document.getElementById("phone-number").addEventListener("input", function () {
	const phoneNumber = document.getElementById("phone-number")
	const phoneNumberLength = phoneNumber.value.trim().length

	if (count > 0 && phoneNumberLength > 0) {
		document.getElementById("next-btn").disabled = false
	} else {
		document.getElementById("next-btn").disabled = true
	}
})

// prevent the default behaviour for form
document.getElementById("form").addEventListener("submit", function (e) {
	e.preventDefault()
})

// get the coupon button
const couponBtn = document.getElementById("apply-btn")
couponBtn.addEventListener("click", function (e) {
	// get the coupon code
	const couponElement = document.getElementById("coupon-code").value
	const couponCode = couponElement.toUpperCase()
	// check if seats are greater or equal 4
	if (count >= 4) {
		document.getElementById("coupon-code").disabled = false
		// calculate discount
		if (couponCode === "NEW15") {
			const discountField = document.getElementById("discount-field")
			discountField.classList.remove("hidden")
			discountField.classList.add("flex")
			discountField.classList.add("justify-between")
			const discountElement = document.getElementById("discount")
			const discountAmount = totalPrice * 0.15
			discountElement.innerText = discountAmount.toFixed(2)

			// hide the coupon field
			const couponField = document.getElementById("coupon-field")
			couponField.classList.add("hidden")
			// calculate grand total
			const grandTotal = document.getElementById("grand-total")

			grandTotal.innerText = (totalPrice - discountAmount.toFixed(2)).toFixed(2)
		} else if (couponCode === "COUPLE 20") {
			const discountField = document.getElementById("discount-field")
			discountField.classList.remove("hidden")
			discountField.classList.add("flex")
			discountField.classList.add("justify-between")
			const discountElement = document.getElementById("discount")
			const discountAmount = totalPrice * 0.2
			discountElement.innerText = discountAmount.toFixed(2)

			// hide the coupon field
			const couponField = document.getElementById("coupon-field")
			couponField.classList.add("hidden")

			// calculate grand total
			const grandTotal = document.getElementById("grand-total")

			grandTotal.innerText = (totalPrice - discountAmount.toFixed(2)).toFixed(2)
		} else {
			alert("invalid coupon")
		}
	}
})
