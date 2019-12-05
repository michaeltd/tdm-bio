app = function() {
    this.toggleDark = function() {
	var classes = document.querySelector('html').classList;
	if (classes.contains('light')) {
            classes.replace('light', 'dark')
        } else {
            classes.replace('dark', 'light')
        }
    };
};
var ste = new app();
