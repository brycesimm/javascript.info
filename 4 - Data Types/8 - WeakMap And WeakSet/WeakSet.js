// WeakSets perform similarly to WeakMaps. In a Weakset, we can only have objects for
// values. When the objects inside are no longer accessible or used, they can be 
// removed by the garbage collector as well. This means that WeakSets are also not
// iterable. They also function as "additional storage", but usually for yes/no 
// confirmations such as keeping a list of users that have visited a site where 
// we can access the set by users to check if they are still around.

