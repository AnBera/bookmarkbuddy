import React from "react";
import { Card, Image, Header, Icon } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";

const BookmarkRecommendationCard = ({ bookmarks }) => {
  return (
    <div className="recommendation-card-container">
      <Header as="h4" className="recommendation-card-header">
        <Icon name="bookmark" />
        Bookmarks Of the Day
      </Header>
      {bookmarks.slice(0, 4).map((bookmark, i) => (
        <Card
          fluid
          className="recommendation-card"
          href={bookmark.url}
          key={bookmark.id}
        >
          <Card.Content>
            <div className="url-heading">
              <Image
                className="padding-right-medium"
                src={`chrome://favicon/${bookmark.Url}`}
              />
              {extractHostname(bookmark.url)}
            </div>
            <Card.Meta>{bookmark.title}</Card.Meta>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default BookmarkRecommendationCard;
