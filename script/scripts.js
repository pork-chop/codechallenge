function articleHeights() {
	var articleHeight = 0;
	var maxArticleHeight = 0;

	if (windowWidth >= 720 ) {	
		$('article').each(function() {
			var thisHeight = $(this).height();

			if (thisHeight > articleHeight) {
				articleHeight = thisHeight;
			}
		
			maxArticleHeight = Math.max(maxArticleHeight, articleHeight); 
		});
	
		$('article').height(maxArticleHeight);
	} else {
		$('article').height('auto');
	}
}

function toggleArticle() {
	$('.articles').on('click', '.toggle a', function(e) {
		e.preventDefault();
		
		if ($('.holder').length > 0) {
			$('.holder').remove();
		}
		
		var articleParent = $(this).parents('article');
		console.log(articleParent);
		var articlesDivHeight = ($('article:first-child').outerHeight() + 20);
		
		if (articleParent.hasClass('holder')) {
			$('.articles').css('height', articlesDivHeight);
			$(window).scrollTop(extraArticleHeight - 61);
			articleParent.remove();
		} else {
			var $articleContent = articleParent.clone();
			($articleContent).addClass('holder').insertAfter(articleParent);
	
			extraArticleHeight = $articleContent.outerHeight();
			$('.articles').css('height', (articlesDivHeight + extraArticleHeight + 35));
			$('.holder').css('top', articlesDivHeight);
			$('.holder .toggle a').text('Close');
		}

	});
}

function toggleFooterNav() {
	if (windowWidth < 720 ) {	
		$('footer dt').click(function(ev) {
			ev.preventDefault();
		
			var $parentDl = $(this).parent('dl');
			
			if ($parentDl.hasClass('active')) {
				$parentDl.removeClass('active');
				$(this).next('dd').find('ul').hide();
			} else {
				$parentDl.addClass('active');
			}
			
			$(this).next('dd').slideToggle(100);

			if ($parentDl.hasClass('active')) {
				$(this).next('dd').find('ul').show(100);
			} 
		});
	} else {
		return;	
	}
}

$(function() {	
	windowWidth = $(window).width();

	articleHeights();
	
	toggleArticle();
	
	toggleFooterNav();
	
	$(window).resize(function() {
		windowWidth = $(window).width();

		$('article').height('auto')
		articleHeights();
	});
});