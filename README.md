# Wisy 

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

[Technical Requirements](./docs/technical_requirements.md)

# 3. Schema

In development...

# 4. Proposed technology stack:

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

# 5. Design

The design should reflect the brand and identity of WISY. Consider a clean, modern, and user-friendly design. Ensure that the website is visually appealing and easy to navigate. You may also consider using design elements similar to the competitors' websites for inspiration.

# 6. Installation

### System dependencies

`ruby '2.7.2'`

`gem 'rails', '~> 6.0.2'`

`database: postgresql`

### Configuration

`git clone https://github.com/allenonrails/event_board/`

`bundle install`

### Empty database

`rails db:drop db:create db:migrate`

###  database with sample data
