import { useContext } from 'react';
import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import Footer from "./Footer";
import { ThemeContext } from "../../ThemeContext";

export default function Creadores() {

    const { theme } = useContext(ThemeContext);

  const footerClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  return (
    <>
      <TopBar />
      <Header />
      <div className={`${footerClasses} border-t border-gray-300 pt-10 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Creadores</h1>
          <p className="mb-4">
            Conoce a los creadores del proyecto:
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/150" alt="Luis Angel Azaña Vega" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">Luis Angel Azaña Vega</h2>
                <p className="text-gray-600">Aspirante a Data Science.</p>
              </div>
              <a href='' className='bg-white rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/150" alt="Pedro Luis De la Cruz Valdiviezo" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">Pedro Luis De la Cruz Valdiviezo</h2>
                <p className="text-gray-600">Aspirante a Ingeniería de Machine Learning</p>
              </div>
              <a href='' className='bg-white rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </a>
            </div>
            {/* 
            <div className="flex items-center space-x-4">
              <img src="https://vitalink.nyc3.cdn.digitaloceanspaces.com/franklin.webp" alt="Franklin Espinoza Pari" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">Franklin Espinoza Pari</h2>
                <p className="text-gray-600">Experto en Node.js, Express, Python, Django, Ruby on Rails, Java, Spring Boot, 
                    Go, PHP, C#, Kotlin, Elixir, Rust, Scala, C++, ASP.NET Core, GraphQL, Microservices, WebSockets, Kafka, RabbitMQ, 
                    Redis, MongoDB, PostgreSQL, MySQL, MariaDB, CouchDB, Neo4j, Cassandra, Elasticsearch, Firebase, DynamoDB, SQLite, 
                    MariaDB, TDD, BDD. React, Angular, Vue.js, Svelte, Ember.js, Backbone.js, TypeScript, JavaScript, HTML5, CSS3, 
                    Sass, LESS, TailwindCSS, Bootstrap, Material UI, Bulma, Foundation, jQuery, Webpack, Babel, Gulp, Grunt, Parcel, 
                    PWA, AMP, Three.js, D3.js, PixiJS, WebRTC, WebSockets, Canvas, WebGL. Docker, Kubernetes, Docker Swarm, AWS ECS, 
                    Google Kubernetes Engine (GKE), Jenkins, CircleCI, GitLab CI/CD, Terraform, Ansible, Puppet, Chef, SaltStack, 
                    Prometheus, Grafana, Datadog, Nagios, Fluentd, Logstash, AWS Lambda, AWS CloudFormation, AWS S3, Azure Functions, 
                    Serverless Framework, Vagrant, OpenShift, Helm, Istio, Consul, Kubernetes Operators.Amazon Web Services (AWS), 
                    Microsoft Azure, Google Cloud Platform (GCP), Oracle Cloud, IBM Cloud, Alibaba Cloud, DigitalOcean, Linode, Heroku, 
                    Firebase, Netlify, Vercel, Cloudflare, Rackspace, CloudFormation, Google App Engine (GAE), AWS EC2, AWS RDS, AWS S3, 
                    AWS CloudWatch, AWS SQS, Azure Blob Storage, GCP Compute Engine, GCP BigQuery, GCP Pub/Sub, Firebase Firestore. 
                    Apache Hadoop, Apache Spark, Apache Kafka, Apache Flink, Apache Storm, Apache Hive, Apache Pig, AWS EMR, Google 
                    BigQuery, MapReduce, AWS Redshift, Snowflake, PrestoDB, Druid, ClickHouse, Apache Drill, MongoDB Atlas, Cassandra, 
                    Elasticsearch, Splunk.TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, LightGBM, OpenCV, NLTK, SpaCy, Hugging Face, 
                    Pandas, NumPy, Matplotlib, Seaborn, SciPy, Jupyter Notebooks, Google AI, OpenAI, GPT-3, AWS SageMaker, Google AI 
                    Platform, Microsoft Cognitive Services, IBM Watson, FastAPI, MLflow, Kubeflow, TFX, AutoML. Docker, Kubernetes, 
                    Docker Compose, Helm, OpenShift, Kubernetes Operators, Rancher, Mesos, Nomad, Amazon EKS, Google GKE, Azure AKS, 
                    Docker Swarm, Tanzu. Git, GitHub, GitLab, Bitbucket, Subversion (SVN), Mercurial, Perforce, CVS, TortoiseGit, 
                    GitFlow. Jenkins, CircleCI, GitLab CI/CD, Travis CI, Bamboo, TeamCity, Puppet, Chef, Ansible, Terraform, SaltStack, 
                    CloudFormation, Gradle, Maven, npm scripts.  Jest, Mocha, Chai, Jasmine, Cypress, Selenium, Puppeteer, Karma, 
                    Supertest, TestCafe, JUnit, NUnit, PyTest, TestNG, Cucumber, Enzyme, React Testing Library, SonarQube, CodeClimate, 
                    ESLint, Prettier, TSLint, Lighthouse. MySQL, PostgreSQL, MongoDB, Redis, Cassandra, Apache CouchDB, SQLite, DynamoDB,
                     Amazon RDS, MariaDB, Amazon Aurora, SQL Server, Elasticsearch, InfluxDB, Neo4j, Amazon Neptune, CockroachDB, 
                     ArangoDB, Firestore, Datomic, FaunaDB, Memcached.raphQL, Apollo, RESTful APIs, SOAP, JSON-RPC, gRPC, Postman, 
                     Swagger, API Gateway, Kong, Tyk, NGINX, HAProxy, Envoy, Linkerd, AWS API Gateway, MuleSoft, Apigee, Azure API 
                     Management. OAuth, JWT, OpenID Connect, SSO, LDAP, SSL/TLS, HTTPS, Nginx, Apache, Vault, AWS Cognito, Keycloak, 
                     bcrypt, Argon2, SQL Injection Prevention, XSS, CSRF, WAF, AWS Shield, Cloudflare, WebSockets Security, OWASP ZAP. 
                     AWS Lambda, Google Cloud Functions, Azure Functions, Firebase Functions, Serverless Framework, Netlify Functions, 
                     Vercel Functions, OpenFaaS. React Native, Flutter, Swift, Kotlin, Objective-C, Xcode, Android Studio, Ionic, 
                     PhoneGap, Apache Cordova, Xamarin, NativeScript, Sencha Touch, Vue Native, NativeBase, Expo.WebSockets, Socket.io, 
                     Firebase Realtime Database, GraphQL Subscriptions, SignalR, MQTT, Redis Pub/Sub. HTTP/2, WebSockets, TCP/IP, UDP, 
                     DNS, SSL/TLS, FTP, SFTP, NTP, SMTP, POP3, IMAP, SSH, VPN, Load Balancing, Reverse Proxies. ypeORM, Sequelize, Prisma, Knex.js, Axios, Lodash, Moment.js, Ramda, Leaflet, Mapbox, Firebase Authentication, Firebase Storage, FastAPI, Next.js, Nuxt.js, TailwindCSS, Sass, LESS, Storybook, Webpack, Babel, Parcel, Gulp, Grunt, ESBuild, Vite, Jest, Mocha, Chai, Cypress. </p>
              </div>
              <a href='' className='bg-white rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </a>
              
            </div>
            */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
