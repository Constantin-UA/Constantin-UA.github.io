'use strict';
//loading window
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const img_1 = document.querySelector('.images-parallax__1');
		const img_2 = document.querySelector('.images-parallax__2');
		const img_3 = document.querySelector('.images-parallax__3');

		//Коєффициенти
		const forImg1 = 40;
		const forImg2 = 20;
		const forImg3 = 10;

		//Скорость анимации
		const speed = 0.15;
		//Об'ява
		let positionX = 0,
			positionY = 0;
		let coordXprocent = 0,
			coordYprocent = 0;

		function setMouseParalaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + distX * speed;
			positionY = positionY + distY * speed;

			img_1.style.cssText = `transform: translate(${positionX / forImg1}%,${
				positionY / forImg1
			}%);`;
			img_2.style.cssText = `transform: translate(${positionX / forImg2}%,${
				positionY / forImg2
			}%);`;
			img_3.style.cssText = `transform: translate(${positionX / forImg3}%,${
				positionY / forImg3
			}%);`;

			requestAnimationFrame(setMouseParalaxStyle);
		}
		setMouseParalaxStyle();

		parallax.addEventListener('mousemove', function (e) {
			// Отримуємо ширину та висоту блоку
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			//Нуль по середині
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Отримуємо проценти
			coordXprocent = (coordX / parallaxWidth) * 100;
			coordYprocent = (coordY / parallaxHeight) * 100;
		});

		// Parallax скрол до низу

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = (window.pageYOffset / parallax.offsetHeight) * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets,
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
			img_2.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
			img_3.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
		}
	}
};
