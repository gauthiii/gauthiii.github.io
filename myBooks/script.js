document.querySelector('.review-btn').addEventListener('click', function() {
    document.getElementById('reviewSection').classList.toggle('hidden');
  });
  
  document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const reviewText = this.querySelector('textarea').value;
    const reviewsList = document.getElementById('reviewsList');
  
    if(reviewsList.querySelector('.no-reviews')) {
      reviewsList.querySelector('.no-reviews').remove();
    }
  
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.textContent = reviewText;
  
    reviewsList.prepend(reviewCard);
  
    this.reset();
    document.getElementById('reviewSection').classList.add('hidden');
  });
  