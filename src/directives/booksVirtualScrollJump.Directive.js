module.exports = (app) => {
    'use strict';

    app.directive('booksVirtualScrollJump', BooksVirtualScrollJumpDirective);

    function BooksVirtualScrollJumpDirective() {
        return {
            restrict: 'A',
            scope: {
                books: '<',
                onScroll: '&'
            },
            link: link
        };

        //////////////////////////////////

        function link(scope, element) {
            const SINGLE_BOOK_ROW_WIDTH = 991;
            const ROW_HEIGHT = 220;
            const HEADER_HEIGHT = 96;
            const REAL_SCROLLABLE_HEIGHT =  1000000; //limit real scroll to 1m
            const PAGE_HEIGHT = REAL_SCROLLABLE_HEIGHT / 100; //limit page height to 10 000

            let booksInRowCount = _getBooksCountInRow();
            let booksCount = scope.books.length;
            let virtualHeight = Math.ceil(booksCount / booksInRowCount) * ROW_HEIGHT;
            let pagesCount = Math.ceil(virtualHeight / PAGE_HEIGHT);
            let pageContainerHeight = window.innerHeight - HEADER_HEIGHT;
            let jumpRatio = (virtualHeight - REAL_SCROLLABLE_HEIGHT) / (pagesCount - 1);

            let currentPage = 0;
            let currentItem = 0;
            let offset = 0;
            let prevScrollTop = 0;

            const pageContainer = $(element);
            const scrollableContent = pageContainer.find('.container');
            const visibleContent = scrollableContent.find('.books-inner');

            _setPageContainerHeight();
            _setScrollableHeight();
            _attachEventListeners();

            onScroll();

            scope.$watch('books', () => {
                if (scope.books.length !== booksCount) {
                    currentItem = Math.floor(scope.books.length * currentItem / booksCount);
                    booksCount = scope.books.length;
                    _calculateNewScrollPosition();
                }
                onScroll();
            });

            scope.$on('$destroy', _removeEventListeners);

            ////////////////////////

            function _setPageContainerHeight() {
                pageContainerHeight = window.innerHeight - HEADER_HEIGHT;
                pageContainer.css('height', pageContainerHeight);
            }

            function _setScrollableHeight() {
                scrollableContent.css('height', REAL_SCROLLABLE_HEIGHT);
            }

            function _attachEventListeners() {
                pageContainer.scroll(onScroll);
                angular.element(window).on('resize', onResize);
            }

            function onScroll(e) {
                const scrollTop = pageContainer.scrollTop();
                if (_hasScrollJumped(scrollTop)) {
                    _onScrollJump(scrollTop);
                } else {
                    _onNearScroll(scrollTop);
                }

                _renderVisibleBooksContent(e);
            }

            function onResize(e) {
                _setPageContainerHeight();
                const newBooksInRowCount = _getBooksCountInRow();

                if (booksInRowCount !== newBooksInRowCount) {
                    booksInRowCount = newBooksInRowCount;
                    _calculateNewScrollPosition();
                    onScroll(e);
                }
            }

            function _hasScrollJumped(scrollTop) {
                return Math.abs(scrollTop - prevScrollTop) > pageContainerHeight * 2;
            }

            function _onScrollJump(scrollTop) {
                currentPage = Math.floor(scrollTop * ((virtualHeight - pageContainerHeight) / (REAL_SCROLLABLE_HEIGHT - pageContainerHeight)) * (1 / PAGE_HEIGHT));
                offset = _getPageOffset();
                prevScrollTop = scrollTop;
            }

            function _onNearScroll(scrollTop) {
                if (_hasScrolledToNextPage(scrollTop)) {
                    _jumpToNextPage(scrollTop);
                }
                else if (_hasScrolledToPreviousPage(scrollTop)) {
                    _jumpToPreviousPage(scrollTop);
                }
                else {
                    prevScrollTop = scrollTop;
                }
            }

            function _hasScrolledToNextPage(scrollTop) {
                return scrollTop + offset > (currentPage + 1) * PAGE_HEIGHT;
            }

            function _hasScrolledToPreviousPage(scrollTop) {
                return scrollTop + offset < currentPage * PAGE_HEIGHT;
            }

            function _jumpToNextPage(scrollTop) {
                currentPage++;
                offset = _getPageOffset();
                pageContainer.scrollTop(prevScrollTop = scrollTop - jumpRatio);
            }

            function _jumpToPreviousPage(scrollTop) {
                currentPage--;
                offset = _getPageOffset();
                pageContainer.scrollTop(prevScrollTop = scrollTop + jumpRatio);
            }

            function _getBooksCountInRow() {
                const windowWidth = $(window).width();

                if (windowWidth <= SINGLE_BOOK_ROW_WIDTH) {
                    return 1;
                }

                return 2;
            }

            function _calculateNewScrollPosition() {
                const newTopRow = Math.floor(currentItem / booksInRowCount);
                virtualHeight = Math.ceil(booksCount / booksInRowCount) * ROW_HEIGHT;
                pagesCount = Math.ceil(virtualHeight / PAGE_HEIGHT);

                const virtualScroll = newTopRow * ROW_HEIGHT;
                currentPage = Math.floor(virtualScroll / PAGE_HEIGHT);
                jumpRatio = (virtualHeight - REAL_SCROLLABLE_HEIGHT) / (pagesCount - 1);

                const newScroll = (currentPage * (PAGE_HEIGHT - jumpRatio)) + (virtualScroll % PAGE_HEIGHT);
                offset = _getPageOffset();
                pageContainer.scrollTop(newScroll);
                prevScrollTop = newScroll;
            }

            function _getPageOffset() {
                return Math.round(currentPage * jumpRatio);
            }

            function _renderVisibleBooksContent(event) {
                const virtualScrollPosition = pageContainer.scrollTop() + offset;
                const buffer = pageContainerHeight;

                let topRenderedRow = Math.floor(virtualScrollPosition / ROW_HEIGHT);
                let bottomRenderedRow = Math.ceil((virtualScrollPosition + pageContainerHeight + buffer) / ROW_HEIGHT);
                topRenderedRow = Math.max(0, topRenderedRow);
                bottomRenderedRow = Math.min(virtualHeight / ROW_HEIGHT, bottomRenderedRow);

                currentItem = topRenderedRow * booksInRowCount;

                visibleContent.css('top', topRenderedRow * ROW_HEIGHT - offset);

                if (event) {
                    scope.$apply(function() {
                        scope.onScroll({toRender: _getRenderedBooks(topRenderedRow, bottomRenderedRow)});
                    });
                } else {
                    scope.onScroll({toRender: _getRenderedBooks(topRenderedRow, bottomRenderedRow)});
                }
            }

            function _getRenderedBooks(topRow, bottomRow) {
                return scope.books.slice(topRow * booksInRowCount, bottomRow * booksInRowCount);
            }

            function _removeEventListeners() {
                angular.element(window).off('resize', onResize);
            }
        }
    }
};
