; (function ($) {
    $(function () {
        var template = $($('[data-sf-role="single-comment-template"]').html());
        var commentsContainer = $('[data-sf-role="comments-holder"]');

        var sampleResponse = {
            Items: [
                { Name: 'Dustin Burke', Date: 'May 14, 2013', Text: 'Wow!' },
                { Name: 'sodablue', Date: 'May 14, 2013', Text: 'The business models created the disruption.' },
                { Name: 'Mark Gjerstad', Date: 'May 14, 2013', Text: 'I think Jobs\' legacy is that he innovated business models and through that disrupted different industries' },
                { Name: 'Scott M. Fulton', Date: 'May 14, 2013', Text: 'Mr. Ross said the administration should make it clear that it has red lines that if crossed would result in a cutoff of aid. And he said it should enlist Saudi Arabia and the Persian Gulf emirates, which are even larger financial supporters of Egypt than the United States, to pressure the generals. “They should use their influence with the Egyptian military to make it easier for us,” he said. The debate over aid, some analysts said, underscored the lack of a fresh strategy for dealing with Egypt. The White House has not conducted a strategic review of its Egypt policy since the ouster of Hosni Mubarak in 2011, they pointed out.  So far, Mr. Kurtzer said, there has been no tension between Israel and the United States over Egypt because neither' }
            ],
            Count: 4
        };

        var sampleUserLoggedInResponse = false;

        var createComment = function (comment) {
            var newComment = template.clone(true);

            newComment.find('[data-sf-role="comment-name"]').text(comment.Name);
            newComment.find('[data-sf-role="comment-date"]').text(comment.Date);
            newComment.find('[data-sf-role="comment-text"]').text(comment.Text);

            commentsContainer.append(newComment);
        };
        
        var makeServiceCall = function () {
            return {
                then: function (cb) {
                    cb(sampleResponse);
                }
            };
        };

        var makeIsUserLoggedInServiceCall = function () {
            return {
                then: function (cb) {
                    cb(sampleUserLoggedInResponse);
                }
            };
        };

        var loadComments = function () {
            makeServiceCall().then(function (response) {
                response.Items.forEach(createComment);
                $('[data-sf-role="comments-count"]').text(response.Count);
            });
        };

        $('[data-sf-role="comments-load-more"]').click(loadComments);
        
        // Initial loading of comments
        loadComments();

        // New comment

        var newCommentForm = $('[data-sf-role="comments-new-holder"]').hide();

        $('[data-sf-role="comments-form"]').click(function () {
            newCommentForm.toggle('slow');
        });

        $('[data-sf-role="comments-new-submit"]').click(function () {
            createComment({
                Name: 'Me',
                Date: 'May 4, 2015',
                Text: $('[data-sf-role="comments-new-text"]').val()
            });
        });

        makeIsUserLoggedInServiceCall().then(function (response) {
            if (response === true) {
                $('[data-sf-role="comments-new-name"]').remove();
                $('[data-sf-role="comments-new-email"]').remove();
                $('[data-sf-role="comments-new-website"]').remove();
            }
        });
    });
}(jQuery));