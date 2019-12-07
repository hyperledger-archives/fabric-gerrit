const fs = require('fs');

fs.readdir(`${__dirname}/backup`, function (err, files) {
	if (err) throw err;
	files.forEach(function (dir) {
		if (dir !== ".git") {
			if (fs.lstatSync(`${__dirname}/backup/${dir}`).isDirectory()) {
				fs.readdir(`${__dirname}/backup/${dir}`, function (err, files) {
					if (err) throw err;
					files.forEach(function (file) {
						const entries = JSON.parse(fs.readFileSync(`./backup/${dir}/${file}`, 'utf8'));
						console.log(`Reading: ./backup/${dir}/${file}`);
						entries.forEach(function (entry) {
							if (entry.data.hasOwnProperty('project')) {
								if (!fs.existsSync(`${entry.data.project}`)) {
									fs.mkdirSync(`${entry.data.project}`);
								}
							} else {
								throw new Error(`Project field empty: ${entry.data}`);
							}

							const filename = `${entry.data.project}/${entry.data.number}.md`;

							if (entry.data.hasOwnProperty('number')) {
								fs.writeFileSync(filename, `<strong>Project</strong>: ${entry.data.project}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.writeFileSync(filename, `<strong>Project</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('branch')) {
								fs.appendFileSync(filename, `<strong>Branch</strong>: ${entry.data.branch}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Branch</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('number')) {
								fs.appendFileSync(filename, `<strong>ID</strong>: ${entry.data.number}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>ID</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('subject')) {
								fs.appendFileSync(filename, `<strong>Subject</strong>: ${entry.data.subject}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Subject</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('status')) {
								fs.appendFileSync(filename, `<strong>Status</strong>: ${entry.data.status}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Status</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('owner')) {
								fs.appendFileSync(filename, `<strong>Owner</strong>: ${entry.data.owner.name} - ${entry.data.owner.email}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Owner</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('assignee')) {
								fs.appendFileSync(filename, `<strong>Assignee</strong>: ${entry.data.assignee.name} - ${entry.data.assignee.email}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Assignee</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('createdOn')) {
								fs.appendFileSync(filename, `<strong>Created</strong>: ${new Date(entry.data.createdOn * 1000).toLocaleString("UTC")}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>Created</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('lastUpdated')) {
								fs.appendFileSync(filename, `<strong>LastUpdated</strong>: ${new Date(entry.data.lastUpdated * 1000).toLocaleString("UTC")}<br>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>LastUpdated</strong>:<br>`, function (err) {
									if (err) throw err;
								});
							}

							if (entry.data.hasOwnProperty('commitMessage')) {
								fs.appendFileSync(filename, `<strong>CommitMessage</strong>:<br><pre>${entry.data.commitMessage}</pre>`, function (err) {
									if (err) throw err;
								});
							} else {
								fs.appendFileSync(filename, `<strong>CommitMessage</strong>:<br><pre>${entry.data.commitMessage}</pre>`, function (err) {
									if (err) throw err;
								});
							}

							fs.appendFileSync(filename, `<h1>Comments</h1>`, function (err) {
								if (err) throw err;
							});

							if (entry.data.hasOwnProperty('comments')) {
								entry.data.comments.forEach(function (comment) {
									if (comment.hasOwnProperty('reviewer')) {
										fs.appendFileSync(filename, `<strong>Reviewer</strong>: ${comment.reviewer.name} - ${comment.reviewer.email}<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (comment.hasOwnProperty('timestamp')) {
										fs.appendFileSync(filename, `<strong>Reviewed</strong>: ${new Date(comment.timestamp * 1000).toLocaleString("UTC")}<br>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Reviewed</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (comment.hasOwnProperty('message')) {
										fs.appendFileSync(filename, `<strong>Message</strong>: <pre>${comment.message}</pre>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Message</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

								});
							}

							fs.appendFileSync(filename, `<h1>PatchSets</h1>`, function (err) {
								if (err) throw err;
							});

							if (entry.data.hasOwnProperty('patchSets')) {
								let index = 1;
								entry.data.patchSets.forEach(function (patchSet) {

									if (patchSet.hasOwnProperty('number')) {
										fs.appendFileSync(filename, `<h3>PatchSet Number: ${patchSet.number}</h3>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<h3>PatchSet Number:</h3>`, function (err) {
											if (err) throw err;
										});
									}

									fs.appendFileSync(filename, '<blockquote>', function (err) {
										if (err) throw err;
									});

									if (patchSet.hasOwnProperty('kind')) {
										fs.appendFileSync(filename, `<strong>Type</strong>: ${patchSet.kind}<br>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Type</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (patchSet.hasOwnProperty('author')) {
										fs.appendFileSync(filename, `<strong>Author</strong>: ${patchSet.author.name} - ${patchSet.author.email}<br>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Author</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (patchSet.hasOwnProperty('uploader')) {
										fs.appendFileSync(filename, `<strong>Uploader</strong>: ${patchSet.uploader.name} - ${patchSet.uploader.email}<br>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Uploader</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (patchSet.hasOwnProperty('createdOn')) {
										fs.appendFileSync(filename, `<strong>Created</strong>: ${new Date(patchSet.createdOn * 1000).toLocaleString("UTC")}<br>`, function (err) {
											if (err) throw err;
										});
									} else {
										fs.appendFileSync(filename, `<strong>Created</strong>:<br>`, function (err) {
											if (err) throw err;
										});
									}

									if (patchSet.hasOwnProperty('revision')) {
										if (entry.data.hasOwnProperty('status')) {
											if (entry.data.status === "MERGED" && index++ === entry.data.patchSets.length) {
												fs.appendFileSync(filename, `<strong>GitHubMergedRevision</strong>: [${patchSet.revision}](https://github.com/hyperledger/${entry.data.project}/commit/${patchSet.revision})<br><br>`, function (err) {
													if (err) throw err;
												});
											} else {
												fs.appendFileSync(filename, `<strong>UnmergedRevision</strong>: ${patchSet.revision}<br><br>`, function (err) {
													if (err) throw err;
												});
											}
										}
									} else {
										fs.appendFileSync(filename, `<strong>Revision</strong>:<br><br>`, function (err) {
											if (err) throw err;
										});
									}

									if (patchSet.hasOwnProperty('approvals')) {
										patchSet.approvals.forEach(function (approval) {
											if (approval.type === 'SUBM') {
												if (approval.hasOwnProperty('by')) {
													fs.appendFileSync(filename, `<strong>MergedBy</strong>: ${approval.by.name}<br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>MergedBy</strong>:<br>`, function (err) {
														if (err) throw err;
													});
												}

												if (approval.hasOwnProperty('grantedOn')) {
													fs.appendFileSync(filename, `<strong>Merged</strong>: ${new Date(approval.grantedOn * 1000).toLocaleString("UTC")}<br><br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>Merged</strong>:<br><br>`, function (err) {
														if (err) throw err;
													});
												}
											} else {
												if (approval.hasOwnProperty('by')) {
													fs.appendFileSync(filename, `<strong>Approver</strong>: ${approval.by.name} - ${approval.by.email}<br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>Approver</strong>:<br>`, function (err) {
														if (err) throw err;
													});
												}

												if (approval.hasOwnProperty('grantedOn')) {
													fs.appendFileSync(filename, `<strong>Approved</strong>: ${new Date(approval.grantedOn * 1000).toLocaleString("UTC")}<br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>Approved</strong>:<br>`, function (err) {
														if (err) throw err;
													});
												}

												if (approval.hasOwnProperty('type')) {
													fs.appendFileSync(filename, `<strong>Type</strong>: ${approval.type}<br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>Type</strong>:<br>`, function (err) {
														if (err) throw err;
													});
												}

												if (approval.hasOwnProperty('value')) {
													fs.appendFileSync(filename, `<strong>Value</strong>: ${Math.sign(approval.value)}<br><br>`, function (err) {
														if (err) throw err;
													});
												} else {
													fs.appendFileSync(filename, `<strong>Value</strong>:<br><br>`, function (err) {
														if (err) throw err;
													});
												}
											}
										});
									}

									fs.appendFileSync(filename, '</blockquote>', function (err) {
										if (err) throw err;
									});
								});
							}
						});
					});
				});
			}
		}
	});
});