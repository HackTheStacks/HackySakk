import $ from 'jquery';

class Popup{
	
	static showPopup(){
		$('#popup').load('partials/popup.html');
        $('#popup').show();
	}

	static closePopup(){
		$('#popup').on('click', function() {
			console.log('click close');
			$('#popup').hide();
		});
	}
}

module.exports = Popup;