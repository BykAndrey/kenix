!(function() {
	function CreateMap() {
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
	scroll();
})();
