!(function() {
	var mapCreated = false;
	function CreateMap() {
		mapCreated = true;
		ymaps.ready(function() {
			var myMap = new ymaps.Map(
					"map",
					{
						center: [53.931944, 27.57836],
						zoom: 17
					},
					{
						searchControlProvider: "yandex#search"
					}
				),
				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});
			myMap.geoObjects.add(myPlacemark);
		});
	}
	function scroll() {
		var htmlS = document.querySelector("html").scrollTop;
		var bodyS = document.querySelector("body").scrollTop;
		var offset = document.getElementById("map").offsetTop;
		if (
			htmlS + window.innerHeight >= offset ||
			bodyS + window.innerHeight >= offset
		) {
			if (mapCreated == false) {
				mapCreated = true;
				var script = document.createElement("script");
				script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
				var head = document.querySelector("head");
				head.appendChild(script);

				script.onload = function() {
					setTimeout(function() {
						CreateMap();
					}, 1000);
				};
			}
		}
	}
	window.addEventListener("scroll", function() {
		if (mapCreated == false) {
			scroll();
		}
	});
})();
