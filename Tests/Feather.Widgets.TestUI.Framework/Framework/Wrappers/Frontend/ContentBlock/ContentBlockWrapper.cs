﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtOfTest.Common.UnitTesting;
using ArtOfTest.WebAii.Controls.HtmlControls;

namespace Feather.Widgets.TestUI.Framework.Framework.Wrappers.Frontend
{
    /// <summary>
    /// This is the entry point class for content block on the frontend.
    /// </summary>
    public class ContentBlockWrapper : BaseWrapper
    {
        /// <summary>
        /// Verify content in content block widget on the frontend
        /// </summary>
        /// <param name="contentBlockContent">The content value</param>
        public void VerifyContentOfContentBlockOnThePageFrontend(string contentBlockContent)
        {
            HtmlDiv frontendPageMainDiv = BAT.Wrappers().Frontend().Pages().PagesWrapperFrontend().GetPageContent();

            List<HtmlDiv> contentBlockCount = frontendPageMainDiv.Find.AllByExpression<HtmlDiv>("tagname=div", "data-sf-field=Content").ToList<HtmlDiv>();

            for (int i = 0; i < contentBlockCount.Count; i++)
            {
                var isContained = contentBlockCount[i].InnerText.Contains(contentBlockContent);
                Assert.IsTrue(isContained, string.Concat("Expected ", contentBlockContent, " but found [", contentBlockCount[i].InnerText, "]"));
            }
        }
    }
}