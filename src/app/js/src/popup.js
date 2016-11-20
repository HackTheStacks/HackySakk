import $ from 'jquery';

class Popup{
	static showPopup(){
		$('#popup').load('partials/popup.html');
        $('#popup').css('display','block');
	}
}