# 1. Project objective

The project aims to create an informational website for WISY. The website will serve as a platform to provide information about the company, its products, the WISY Academy, and other related content. The website will primarily be in English, with additional language support for Russian.

Direct competitor: https://swissborg.com/
Similar projects:
https://www.acorns.com/
https://www.stash.com/

# 2. System Description

The system consists of the following main functional blocks:

1. Home Page - Product
2. Token Page
3. About the Company
4. Partner Program
5. Investor Page
6. WISY Academy
7. Blog (Articles)
8. Administrator Functionality

## 2.1 Home Page - Product

The home page will be the entry point for users and will showcase the main product or services offered by WISY. It should include the following features:

* Introduction to the product with images and text.
* Key product features and benefits.
* User-friendly navigation to other sections of the website.

## 2.2 Token Page

This section will provide information about any tokens or cryptocurrencies associated with WISY. It should include:

* Token details, including name, symbol, and purpose.
* Information on how to acquire and use the token.
* Real-time token price information if relevant.
* Wallet integration for token management (if applicable).

## 2.3 About the Company

The "About the Company" section should offer detailed information about WISY, its history, mission, and values. It should include:

* Company background and history.
* Mission and vision statements.
* Team members and their profiles.
* Contact information for customer support.

## 2.4 Partner Program

This section will describe any partner programs offered by WISY. It should include:

* Program details and benefits.
* How to become a partner.
* Partner resources and support.
* Contact information for partnership inquiries.

## 2.5 Investor Page

The Investor Page should provide information for potential investors. It should include:

* Investment opportunities and options.
* Financial reports and statements.
* Information on the company's financial health.
* Contact information for investor relations.

## 2.6 WISY Academy

This section will host educational content related to WISY and its offerings. It should include:

* Courses and training materials.
* User registration and authentication for accessing the academy.
* Progress tracking and certificates for completed courses.

## 2.7 Blog (Articles)

The Blog section is a crucial component of the website for sharing industry insights and company updates. Here are more detailed requirements:
### 2.7.1 Content Management System (CMS)

A robust Content Management System (CMS) should be implemented to enable easy article creation, editing, and management. This system should allow authorized users, typically content creators or administrators, to:
Create new articles with the following fields:
* Title
* Author
* Publication date
* Body content (rich text or markdown support)
* Image or featured image
* Categories and tags for organization
* Edit and update existing articles.
* Schedule article publication for a future date.
* Set articles as drafts for further editing or as published for public access.
* Delete articles when necessary.

### 2.7.2 Categories and Tags

Articles should be categorized and tagged for efficient organization and user navigation. The system should include:

* Ability to create, edit, and delete categories and tags.
* Assigning multiple categories and tags to an article.
* A user-friendly filtering mechanism to browse articles by category or tag.

### 2.7.3 User Comments and Engagement

To encourage user engagement and discussion, the system should allow:

* Registered users to leave comments on articles.
* An upvote/downvote system for user comments.
* A reporting mechanism for inappropriate or spam comments.
* Reply functionality to engage in threaded discussions.

### 2.7.4 Social Media Sharing

Promote article sharing and wider reach through social media:

* Implement social media sharing buttons for each article.
* Ensure that shared articles display relevant metadata and images on social media platforms.

## 2.8 Administrator Functionality

Administrator functionality is vital for website management and content moderation. Here are additional details:

### 2.8.1 User Management

Administrators should be able to manage user accounts, roles, and permissions:

* Create, edit, or delete user accounts.
* Assign roles to users (e.g., admin, content creator, moderator).
* Manage user permissions, such as editing articles, managing comments, or accessing specific sections of the website.

### 2.8.2 Content Management

Administrators should have the ability to oversee and moderate website content:

* Access and manage all articles, including editing and deleting.
* Review and moderate user-generated content, such as comments on articles.
* Monitor and address reported content violations.
*Archive or temporarily unpublish articles if necessary.

### 2.8.3 Reports and Analytics

To ensure website performance and user engagement, administrators should have access to reports and analytics:

* Generate reports on website usage, including page views, user interactions, and traffic sources.
* Monitor user engagement and popular articles.
* Identify and address issues, such as high bounce rates or low user engagement.

### 2.8.4 Security and Backup

Admins should maintain website security and perform regular backups:

* Implement security measures to protect sensitive user data.
* Regularly back up the website's content and databases to prevent data loss.

### 2.8.5 User Support

Provide support and assistance to users:

* Address user inquiries, issues, and requests.
* Have a designated contact point for user support, possibly an email or contact form.

### 2.8.6 Email Notifications

Enable email notifications for administrators to receive updates and alerts regarding the website's status, including:

* Notifications for reported content violations.
* Notifications for user support inquiries.
* Critical system alerts (e.g., website downtime or security breaches).

# 3. Proposed technology stack:

* Bakcend:
  - Ruby 3.0.3
  - Ruby on rails 7.0.8
  - PostgreSQL db
  - Devise for registration and authentication
  - Pudnit for authorization
  - i18n for app multitranslate
  - puma server
  - activestorage
* Fronted
  - native javascript
  - tailwindcss

# 4. Design

The design should reflect the brand and identity of WISY. Consider a clean, modern, and user-friendly design. Ensure that the website is visually appealing and easy to navigate. You may also consider using design elements similar to the competitors' websites for inspiration.

