App.service("paginator",[function(){
	this.appendPrevNext = true;
	this.getStartEndPage = function(pageNumbers,currentPage,pagesToShow){
    	//This method will return an object with start and end page values.
		var pagesObj = {startPage:0,endPage:0}
		var floorVal = Math.floor(pagesToShow/2);
		if((currentPage-floorVal)< 1){
			pagesObj.startPage = 1;
			if(pageNumbers<=pagesToShow){
    			pagesObj.endPage = pageNumbers;
			}
			else{
				pagesObj.endPage = pagesToShow;
			}
		}	
		else if((currentPage+floorVal) > pageNumbers){
			pagesObj.endPage = pageNumbers;
			if(pageNumbers<=pagesToShow){
    			pagesObj.startPage = pagesObj.endPage - (pageNumbers-1);
			}
			else{
    			pagesObj.startPage = pagesObj.endPage - (pagesToShow-1);
			}
		}
		else{
			pagesObj.startPage = currentPage-floorVal;
			pagesObj.endPage = currentPage+floorVal;
		}
		return pagesObj;
	}

	this.generatePageObjects = function(pageCount,itemCount,currentPage,pagesToShow){
   		var pageNumbers = Math.ceil(itemCount/pageCount);
    	var pagesToShow = pagesToShow || pageNumbers;
    	var startPage = this.getStartEndPage(pageNumbers,currentPage,pagesToShow).startPage;
    	var endPage = this.getStartEndPage(pageNumbers,currentPage,pagesToShow).endPage;
    	var i=startPage;
    	var pageObjects = [];
    	while(i<=endPage){
    		var pageObject = {
    			active:(i==currentPage),
    			number:i,
    			title:i++
    		}
    		pageObjects.push(pageObject);
    	}
    	//Addding previous and next page objects. 
    	if(this.appendPrevNext){
    		if(currentPage != 1){
	    		var prevObject = {
	    			active:false,
	    			number:currentPage-1,
	    			title:"Previous"
	    		}
	    		pageObjects.unshift(prevObject);
    		}
    		if(currentPage != pageNumbers){
    			var nextObject = {
    				active:false,
    				number:currentPage+1,
    				title:"Next"	
    			}
    			pageObjects.push(nextObject);	
    		}
    	}
    	return pageObjects;
	}
	this.filterResults = function(currentPage,items,pageCount){
		//filter the items on the basis of the current page value and the total number
		//of pages.
		if(currentPage<1){	return []; }
		return items.slice((currentPage-1)*pageCount,currentPage*pageCount)
	}
}])