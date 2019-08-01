import React from 'react';
import { Card, Image } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";

const BookmarkRecommendationCard = ({bookmark}) => (
    <Card fluid className="recommendation-card" href={bookmark.url}>
        <Card.Content>
        {/* <span className="ui transparent floating label context-icons">
          <Icon name='pin' />
          <Icon name='edit' />
          <Icon name='delete' />
        </span> */}
      
        {/* <Label as='a' color='grey' ribbon='right'>
          <Icon name='pin' />
        </Label> */}
          
          {/*TODO use onclick to filter based on sitename */}
          <div className="url-heading">
            <Image
              className="padding-right-medium"
              src={`chrome://favicon/${bookmark.Url}`}
            />
            {extractHostname(bookmark.url)}
          </div>
          <Card.Meta>{bookmark.title}</Card.Meta>
          {/* <Hover
            onHover={
              <Label
                attached="bottom left"
                style={{ backgroundColor: colorsMap[bookmark.category] }}
                onClick={this.onCategoryClick}
              >
                {bookmark.category}
                <span className="category" />
              </Label>
            }
          >
            <Label attached="bottom left" onClick={this.onCategoryClick}>
              {bookmark.category}
              <span className="category" style={style} />
            </Label>
          </Hover> */}
        </Card.Content>
      </Card>
)

export default BookmarkRecommendationCard;