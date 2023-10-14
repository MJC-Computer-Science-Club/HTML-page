## CS club member directory

This is a directory of all the members of the CS club. Each member has their own html file with their name as the filename. The html file can contain whatever you want. It can be a resume, a link to your github, or just a picture of a cat.

## git collaboration structure
for this project we will be using a git collaboration structure called [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow). This means that we will have a $\textcolor{red}{\textsf{main}}$ branch and a development branch called $\textcolor{red}{\textsf{group-page-addition}}$. The main branch will be the branch that is deployed to the website. The group-page-addition branch will be the branch that we merge all of our feature branches into. The feature branches will be the branches that we create for each new feature that we add to the website.

> in this case a feature is a new member page that we add to the website

## How to add yourself to the directory

1. clone this repo

```
git clone https://github.com/MJC-Computer-Science-Club/HTML-page.git

 ```
2. create a new branch
    
``` 
git branch <branch name>

git checkout <your name>
```
3. add a new html file to the directory with your name as the filename
4. add whatever you want to the html file
5. commit and push your changes

```
git add <your name>.html
git commit -m "added <your name> to the directory"
git push origin <your name>
```

6. open a pull request to merge your branch into the group-page-addition branch

>this will be done on github.com unless you have the github cli installed
